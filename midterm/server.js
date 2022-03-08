const { userValidation } = require("./validation-helpers");
const { Game, Guess, User, Session } = require("./models");
const express = require("express");
const app = express();
const uuid = require("uuid/v4");
const cookieParser = require("cookie-parser");
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

const sessions = {};

const addNewUser = (sid, username) => {
  sessions[sid] = new User(username);
};

const getUser = (sid) => {
  return sessions[sid];
};

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  let htmlToBeRendered;
  if (sid && sessions[sid]) {
    const user = getUser(sid);

  } else {
    htmlToBeRendered = `<link rel="stylesheet" href="/style.css" />
    <h2>Please Login</h2>
    <form method="POST" action="/login">
    <label>Username : </label><input type="text" name="username">
      <button type="submit">Login</button>
    </form>`;
  }

  res.send(htmlToBeRendered);
});

app.
