const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

// Sessions
app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: "auth-insufficient" });
    return;
  }
  if (username === "dog") {
    res.status(403).json({ error: "dog-not-allowed-in-username" });
    return;
  }
  const sid = sessions.addSession(username);
  if (users.getUserData(username) === undefined) {
    users.addUserData(username, 8);
  }
  res.cookie("sid", sid);
  res.sendStatus(200);
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (sid) {
    res.clearCookie("sid");
  }
  if (username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// Inventory
app.get("/api/inventory", (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(users.getUserData(username));
});

app.post("/api/inventory", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { inventory } = req.body;

  if (inventory === null) {
    res.status(400).json({ error: "required-inventory" });
    return;
  }

  if (inventory < 0) {
    res.status(400).json({ error: "inventory-negative" });
    return;
  }
  users.addUserData(username, inventory);
  res.json(inventory);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
