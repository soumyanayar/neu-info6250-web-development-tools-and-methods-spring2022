import { fetchTodos } from "./services";
import React from "react";
import {
  fetchLogout,
  fetchDeleteTodo,
  fetchAddTodo,
  fetchUpdateTodo,
} from "./services";
import { useState, useEffect } from "react";
import Login from "./Login";

function MainPage({ user, setIsLoggedIn }) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [todoFormText, setTodoFormText] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    fetchTodos()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handlelogout = () => {
    fetchLogout()
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
      })
      .catch((error) => {
        setError(error);
      });
    setIsLoggedIn(false);
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
    fetchAddTodo(todoText)
      .then(() => {
        setError("");
        fetchTodos().then((todos) => {
          setTodoFormText("");
          setTodos(todos);
        });
      })
      .catch((error) => {
        setError(error);
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

  return (
    <div className="main-page-div">
      <div className="title-div">
        <h1>Welcome {user}</h1>
        <button onClick={handlelogout}>Logout</button>
      </div>
      <div className="todo-list-container">
        {Object.keys(todos).map(function (todoId) {
          return (
            <div key={todos[todoId].id} className="todo-list-div">
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
                <span className="checked-todo">
                  <s>{todos[todoId].task}</s>{" "}
                </span>
              ) : (
                <span className="unchecked-todo">{todos[todoId].task}</span>
              )}
              <a href="#" onClick={() => handleDeleteTodo(todos[todoId].id)}>
                X
              </a>
            </div>
          );
        })}
      </div>
      <div className="add-todo-form">
        <form>
          <input
            required
            type="text"
            value={todoFormText}
            onChange={(event) => setTodoFormText(event.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </form>
        {error && <p>{error.error}</p>}
      </div>
    </div>
  );
}

export default MainPage;
