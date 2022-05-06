module.exports = (data, sessions) => {
  const authorizeToken = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId]) {
      // get the user from the data source
      const user = data.getUser(sessions[sessionId]);
      // check if the user is logged in
      if (user) {
        // add the user to the request object
        req.user = user;
        next();
      } else {
        // delete the session id from the sessions object
        delete sessions[sessionId];
        return res.status(401).json({
          message: "SessionExpired",
        });
      }
    } else {
      // return 401 Unauthorized
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  };

  return authorizeToken;
};
