module.exports = (userData, sessions, userToSessionsMap) => {
  const express = require("express");
  const userRouter = express.Router();
  const { v4: uuidv4 } = require("uuid");
  const authenticateUser = require("../middlewares/authenticateUser")(
    userData,
    sessions
  );
  const { hashifyPassword, comparePassword } = require("../utils/authHelpers");

  const { deleteAllHabits } = require("../data/habit-data-provider");

  const formatUser = (user) => {
    if (user["password"]) {
      delete user["password"];
      delete user["habits"];
      return user;
    }
  };

  // POST /v1/user : create a new user and store in the data source
  userRouter.post("/", async (req, res) => {
    if (req.body.createdAt || req.body.updatedAt) {
      return res.status(400).json({
        message:
          "createdAt and updatedAt fields should not be sent in the request body",
      });
    }

    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName
    ) {
      return res.status(400).json({
        message: "email, password, firstName, lastName can't be empty",
      });
    }

    // check if email is a valid email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      return res.status(400).json({
        message: "email is not a valid email",
      });
    }

    // check if the user already exists
    if (userData.checkIfUserExists(req.body.email)) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    // hash the password
    const hashedPassword = await hashifyPassword(req.body.password);

    try {
      // create a new user and store in the data source
      userData.createNewUser(
        req.body.email,
        hashedPassword,
        req.body.firstName,
        req.body.lastName
      );

      // return the newly created user
      const user = userData.getUser(req.body.email);
      return res.status(201).json(formatUser(user));
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  // POST /v1/user/login : login a user and return a session token
  userRouter.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "email and password can't be empty",
      });
    }

    // check if the user exists
    if (!userData.checkIfUserExists(req.body.email)) {
      return res.status(400).json({
        message: "email or password is incorrect",
      });
    }

    // check if the password is correct
    const user = userData.getUser(req.body.email);
    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "email or password is incorrect",
      });
    }

    // generate a session id
    let sessionId;

    if (userToSessionsMap[req.body.email]) {
      sessionId = userToSessionsMap[req.body.email];
    } else {
      sessionId = uuidv4();
      sessions[sessionId] = user.email;
      userToSessionsMap[user.email] = sessionId;
    }

    // set the session cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      user: req.body.email,
    });
  });

  // POST /v1/user/logout : logout a user and invalidate the session id
  userRouter.post("/logout", authenticateUser, (req, res) => {
    const sessionId = req.cookies.sessionId;
    delete sessions[sessionId];
    delete userToSessionsMap[sessions[sessionId]];
    res.clearCookie("sessionId");
    res.sendStatus(200);
  });

  // GET /v1/user/me : get the current user
  userRouter.get("", authenticateUser, (req, res) => {
    res.status(200).json(formatUser(req.user));
  });

  // Update /v1/user/me : update the current user
  userRouter.put("", authenticateUser, async (req, res) => {
    let user = req.user;
    try {
      if (req.body.email && req.body.email !== user.email) {
        // do not allow email change
        return res.status(400).json({
          message: "email can't be changed",
        });
      }

      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.password = req.body.password
        ? await hashifyPassword(req.body.password)
        : user.password;
      user.updatedAt = new Date();

      userData.updateUser(user);
      user = userData.getUser(req.body.email);
      return res.sendStatus(204);
    } catch {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  // DELETE /v1/user : delete the current user
  userRouter.delete("", authenticateUser, (req, res) => {
    deleteAllHabits(req.user.email);
    userData.deleteUser(req.user.email);
    const sessionId = req.cookies.sessionId;
    delete sessions[sessionId];
    delete userToSessionsMap[sessions[sessionId]];
    res.clearCookie("sessionId");
    return res.sendStatus(204);
  });

  return userRouter;
};
