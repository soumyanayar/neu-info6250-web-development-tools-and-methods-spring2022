const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const validateUserName = require("./validation");
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

const sessions = {};
const words = {};

app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  let html;
  if (sid && sessions[sid]) {
    const username = sessions[sid].username;
    const word = words[username] ? words[username].word : "";
    const htmlForm = `<form method="POST" action="/">
    Add Your Word : <input type="text" name="word" placeholder="Enter the word">
    <button type="submit">Add Word</button>
  </form>
  <form method="POST" action="/logout">
    <button type="submit">Logout</button>
  </form>`;
    let html;
    if (!word) {
      html = `<h2>Welcome ${username}</h2>` + htmlForm;
    } else {
      sessions[sid].word = word;
      html =
        `<h2>Welcome ${username} :Your Previous word was ${word} </h2>` +
        htmlForm;
    }
    res.send(html);
  } else {
    html = `
    <h2>Please Login</h2>
    <form method="POST" action="/login">
      UserName : <input type="text" name="username">
      <button type="submit">Login</button>
    </form>`;
  }
  res.send(html);
});

// login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const sid = uuidv4();
  if (!validateUserName(username)) {
    const invalidUserNameHtml = `<h2>Invalid UserName</h2>
    <h3>Please Login Again..!!</h3>
    <form method="GET" action="/">
    <button type="submit">Login</button>
    </form>`;
    res.status(401).send(invalidUserNameHtml);
    return;
  }
  sessions[sid] = { username };
  res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  res.redirect("/");
});

// add word to the words object
app.post("/", (req, res) => {
  const sid = req.cookies.sid;
  const word = req.body.word;
  words[sessions[sid].username] = { word };
  res.redirect("/");
});

// app logout
app.post("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
