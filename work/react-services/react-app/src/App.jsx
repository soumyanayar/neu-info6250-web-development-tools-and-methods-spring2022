import React from "react";
import { useState, useEffect } from "react";
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTodos,
  fetchAddTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
} from "./services";

const App = () => {
  const [user, setUser] = useState("");
  const [loginFormUserName, setLoginFormUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoFormText, setTodoFormText] = useState("");
  const [error, setError] = useState("");

  const fetchUserFromSession = () => {
    fetchSession()
      .then((returnedUser) => {
        setUser(returnedUser.username);
        setIsLoggedIn(true);
        fetchTodos().then((todos) => {
          setTodos(todos);
        });
      })
      .catch(() => {
        setUser("");
        setLoginFormUserName("");
        setIsLoggedIn(false);
      });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    fetchLogin(loginFormUserName)
      .then((user) => {
        fetchUserFromSession();
      })
      .catch((error) => {
        setError(error);
        console.log(error.error);
      });
  };

  const handleLogoutSubmit = (event) => {
    event.preventDefault();
    fetchLogout().then(() => {
      fetchUserFromSession();
    });
  };

  const handleDeleteTodo = (todoId) => {
    fetchDeleteTodo(todoId).then(() => {
      fetchTodos().then((todos) => {
        setTodos(todos);
      });
    });
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoText = todoFormText;
    fetchAddTodo(todoText).then(() => {
      fetchTodos().then((todos) => {
        setTodoFormText("");
        setTodos(todos);
      });
    });
  };

  const handleUpdateTodo = (todoId, todoText, todoDone) => {
    const todoUpdates = {
      task: todoText,
      done: todoDone,
    };
    fetchUpdateTodo(todoId, todoUpdates).then(() => {
      fetchTodos().then((todos) => {
        setTodos(todos);
      });
    });
  };

  useEffect(() => {
    fetchUserFromSession();
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>
            Username:
            <input
              required
              type="text"
              value={loginFormUserName}
              onChange={(event) => setLoginFormUserName(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user}</h1>
      <button onClick={handleLogoutSubmit}>Logout</button>
      {Object.keys(todos).map(function (todoId) {
        return (
          <div key={todos[todoId].id}>
            <input
              type="checkbox"
              checked={todos[todoId].done}
              onClick={() =>
                handleUpdateTodo(
                  todos[todoId].id,
                  todos[todoId].task,
                  !todos[todoId].done
                )
              }
            />
            {todos[todoId].done ? (
              <span>
                <s>{todos[todoId].task}</s>{" "}
              </span>
            ) : (
              <span>{todos[todoId].task}</span>
            )}
            <a href="#" onClick={() => handleDeleteTodo(todos[todoId].id)}>
              X
            </a>
          </div>
        );
      })}
      <div>
        <form>
          <input
            required
            type="text"
            value={todoFormText}
            onChange={(event) => setTodoFormText(event.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </form>
      </div>
    </div>
  );
};

export default App;
