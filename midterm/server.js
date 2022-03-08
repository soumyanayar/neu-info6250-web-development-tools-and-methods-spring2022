const { validateUsername } = require("./validation-middlewares");
const { Game, Guess, User } = require("./models");
const { loginPage } = require("./html-templates");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cookieParser());

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
    htmlToBeRendered = `<!doctype html>`;
  } else {
    htmlToBeRendered = loginPage();
  }

  res.send(htmlToBeRendered);
});

app.post("/login", validateUsername, (req, res) => {
  const { username } = req.body;
  const sid = uuidv4();
  addNewUser(sid, username);
  res.cookie("sid", sid);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
