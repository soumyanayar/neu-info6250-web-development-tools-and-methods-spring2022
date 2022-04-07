import { fetchTodos } from "./services";
import React from "react";
import { fetchLogout, fetchDeleteTodo } from "./services";
import { useState, useEffect } from "react";
import Login from "./Login";

function MainPage({ setUser, setIsLoggedIn }) {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);

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
    setIsLoggedOut(true);
  };

  const deleteToDo = (id) => {
    fetchDeleteTodo(id)
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
      })
      .catch((error) => {
        setError(error);
      });
  };

  // Onclicking X button the todo is deleted from the list and displayed on the screen
  const handleDelete = (id) => {
    deleteToDo(id);
    Object.values(todos).map((todo) => {
      if (todo.id === id) {
        todo.isDeleted = true;
      }
    });
  };

  if (isLoggedOut) {
    return <Login setIsLoggedIn={isLoggedOut} />;
  }

  return (
    <div className="MainPage">
      <div>
        <h1>Welcome {setUser}</h1>
        <button onClick={handlelogout}>Logout</button>
      </div>

      {Object.keys(todos).map(function (todoId) {
        return (
          <div key={todos[todoId]}>
            <span>{todos[todoId].task}</span>{" "}
            <button onClick={() => handleDelete(todos[todoId])}>X</button>
          </div>
        );
      })}
      <form>
        <label>Add task : </label>
        <input type="text" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default MainPage;
