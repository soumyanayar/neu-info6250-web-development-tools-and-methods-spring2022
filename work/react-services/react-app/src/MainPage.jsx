import { fetchTodos } from "./services";
import React from "react";
import { fetchLogout } from "./services";
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

  if (isLoggedOut) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
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
            <h2>{todos[todoId].task}</h2>
          </div>
        );
      })}

      {error && <div>{error}</div>}
    </div>
  );
}

export default MainPage;
