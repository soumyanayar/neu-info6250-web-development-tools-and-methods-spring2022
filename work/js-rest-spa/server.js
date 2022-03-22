const express = require("express");
const app = express();
const PORT = 3000;
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const sessions = require("./sessions");
const users = require("./users");
const inventory = require("./inventory");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(express.json());

app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }
  const inventoryData = inventory.getInventory(username);
  res.json({ username, inventory: inventoryData });
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }
  if (sid) {
    res.clearCookie("sid");
  }
  if (username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  console.log(req);
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: "Missing username" });
    return;
  }
  if (username === "dog") {
    res.status(401).json({ error: "Invalid username! Dog is not allowed" });
    return;
  }
  const sid = sessions.addSession(username);
  // when there is a inventory for the user, send it back
  const inventoryData = inventory.getInventory(username);
  if (!inventoryData) {
    inventory.setInventory(username, {});
  }
  res.cookie("sid", sid);
  res.json({ username });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
