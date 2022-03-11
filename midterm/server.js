const { validateUsername } = require("./validation-middlewares");
const { Game, Guess, User } = require("./models");
const { loginPage, homePage } = require("./html-templates");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cookieParser());

const sessions = {};
const userSidMap = {};

const getSidIfUserExists = (username) => {
  if (username in userSidMap) {
    return userSidMap[username];
  }

  return null;
};

const addNewUserSidMapping = (username, sid) => {
  userSidMap[username] = sid;
};

const addNewUser = (sid, username) => {
  sessions[sid] = new User(username);
};

const getUser = (sid) => {
  return sessions[sid];
};

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  let htmlToBeRendered;
  if (sid && sid in sessions) {
    const user = getUser(sid);
    htmlToBeRendered = homePage(user);
  } else {
    htmlToBeRendered = loginPage();
  }

  res.send(htmlToBeRendered);
});

app.post("/login", validateUsername, (req, res) => {
  const { username } = req.body;
  let sid = getSidIfUserExists(username);
  if (!sid) {
    sid = uuidv4();
    addNewUser(sid, username);
    addNewUserSidMapping(username, sid);
  }
  res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.redirect("/");
});

app.post("/guess", (req, res) => {
  let { guessedWord } = req.body;
  guessedWord = guessedWord.trim();
  const sid = req.cookies.sid;
  const user = getUser(sid);
  if (user === undefined) {
    let html = "<h1>Invalid User!! Please login Again</h1>" + loginPage();
    res.send(html);
  } else {
    user.game.guessWord(guessedWord);
    res.redirect("/");
  }
});

app.get("/restart", (req, res) => {
  const sid = req.cookies.sid;
  const user = getUser(sid);
  user.createNewGame();
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
