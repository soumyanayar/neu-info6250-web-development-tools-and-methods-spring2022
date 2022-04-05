const uuid = require("uuid").v4;

function makeTodoList() {
  // These are hardcoded initial state when we restart the server
  const id1 = uuid();
  const id2 = uuid();

  const todoList = {};
  const todos = {
    // The below syntax lets you use a variable value as the key
    // if the value of id1 is "asdf", the property is "asdf", not "id1"
    [id1]: {
      id: id1,
      task: "Nap",
      done: false,
    },
    [id2]: {
      id: id2,
      task: "Race away for no reason",
      done: true,
    },
  };

  todoList.contains = function contains(id) {
    // This !! syntax coerces the value to a boolean
    // First by giving us the reverse of the truthy/falsy value,
    // then by reversing it to true/false
    return !!todos[id];
  };

  todoList.getTodos = function getTodos() {
    return todos;
  };

  todoList.addTodo = function addTodo(task) {
    const id = uuid();
    todos[id] = {
      id,
      task,
      done: false,
    };
    return id;
  };

  todoList.getTodo = function getTodo(id) {
    return todos[id];
  };

  todoList.updateTodo = function updateTodo(id, todo) {
    // this uses ?? because we need to accept `false` as a legit value
    // And ?? only falls to the second argument if the first is undefined or null
    todos[id].done = todo.done ?? todos[id].done;
    // the below could use ?? or ||, but I wand the default instead of ''
    todos[id].task = todo.task || todos[id].task;
  };

  todoList.deleteTodo = function deleteTodo(id) {
    delete todos[id];
  };

  return todoList;
}

module.exports = {
  makeTodoList,
};
