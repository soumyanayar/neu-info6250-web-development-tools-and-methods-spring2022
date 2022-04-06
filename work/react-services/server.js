const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;

const todos = require("./todos");

const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
// app.use(express.static("./public"));
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
    res.status(400).json({ error: "required-username" });
    return;
  }
  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if (!existingUserData) {
    users.addUserData(username, todos.makeTodoList());
  }
  res.cookie("sid", sid);
  res.json(users.getUserData(username).getTodos());
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

// Todos
app.get("/api/todos", (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json(users.getUserData(username).getTodos());
});

app.post("/api/todos", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { task } = req.body;
  if (!task) {
    res.status(400).json({ error: "required-task" });
    return;
  }
  const todoList = users.getUserData(username);
  const id = todoList.addTodo(task);
  res.json(todoList.getTodo(id));
});

app.get("/api/todos/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  if (!todoList.contains(id)) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(todoList.getTodo(id));
});

app.put("/api/todos/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  const { task, done = false } = req.body;
  // Full Replacement required for a PUT
  if (!task) {
    res.status(400).json({ error: "required-task" });
    return;
  }
  if (!todoList.contains(id)) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { task, done });
  res.json(todoList.getTodo(id));
});

app.patch("/api/todos/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { id } = req.params;
  const { task, done } = req.body;
  const todoList = users.getUserData(username);
  if (!todoList.contains(id)) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { task, done });
  res.json(todoList.getTodo(id));
});

app.delete("/api/todos/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);
  if (exists) {
    todoList.deleteTodo(id);
  }
  res.json({
    message: exists ? `todo ${id} deleted` : `todo ${id} did not exist`,
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
