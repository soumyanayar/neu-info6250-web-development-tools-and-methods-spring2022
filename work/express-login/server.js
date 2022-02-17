const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const validateUserName = require("./validation");
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

const sessions = {};

app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  const word = sessions[sid] ? sessions[sid].word : "";
  if (sid && sessions[sid]) {
    const username = sessions[sid].username;
    if (!word) {
      res.send(`
      <h2>Welcome ${username} </h2>
      <form method="POST" action="/">
      Add Your Word : <input type="text" name="word" placeholder="Enter the word">
      <button type="submit">Add Word</button>
    </form>
      `);
    } else {
      sessions[sid].word = word;
      res.send(`<h2>Welcome ${username} : Your Previous word was ${word} </h2>
    <form method="POST" action="/">
    Add Your Word : <input type="text" name="word" placeholder="Enter the word">
    <button type="submit">Add Word</button>
  </form>`);
    }
  } else {
    res.send(`
    <h2>Please Login</h2>
    <form method="POST" action="/login">
      UserName : <input type="text" name="username">
      <button type="submit">Login</button>
    </form>`);
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const sid = uuidv4();
  if (!validateUserName(username)) {
    res.send("Username is required");
    return;
  }
  sessions[sid] = { username };
  res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  res.redirect("/");
});

app.post("/", (req, res) => {
  const sid = req.cookies.sid;
  const word = req.body.word;
  sessions[sid].word = word;
  res.redirect("/");
});

app.post("/logout", express.json(), (req, res) => {
  res.clearCookie("name");
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
