import { useState, useEffect } from "react";
import { reducer, initialState } from "./reducer";
import {
  fetchLogout,
  fetchDeleteTodo,
  fetchAddTodo,
  fetchTodos,
  fetchUpdateTodo,
} from "./services";

const MainPage = ({ dispatch, state }) => {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchTodos()
        .then((fetchedTodos) => {
          dispatch({ type: "FETCH_TODOS", fetchedTodos });
          setIsPageLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsPageLoading(false);
        });
    }, 2000);
  }, []);

  const handlelogout = () => {
    fetchLogout()
      .then((fetchedTodos) => {
        dispatch({ type: "FETCH_TODOS", fetchedTodos });
      })
      .catch((error) => {
        setError(error);
      });
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteTodo = (todoId) => {
    fetchDeleteTodo(todoId).then(() => {
      fetchTodos().then((fetchedTodos) => {
        dispatch({ type: "FETCH_TODOS", fetchedTodos });
      });
    });
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoText = newTodo;
    fetchAddTodo(todoText)
      .then(() => {
        setError("");
        fetchTodos().then((fetchedTodos) => {
          setNewTodo("");
          dispatch({ type: "FETCH_TODOS", fetchedTodos });
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
      fetchTodos().then((fetchedTodos) => {
        dispatch({ type: "FETCH_TODOS", fetchedTodos });
      });
    });
  };

  if (isPageLoading) {
    return <h2 className="loading-div">Loading..!</h2>;
  }

  return (
    <div className="main-page-div">
      <div className="title-div">
        <h1>Welcome {state.username}</h1>
        <button onClick={handlelogout}>Logout</button>
      </div>
      <div className="todo-list-container">
        {Object.keys(state.todos).map(function (todoId) {
          return (
            <div key={state.todos[todoId].id} className="todo-list-div">
              <input
                type="checkbox"
                checked={state.todos[todoId].done}
                onChange={() =>
                  handleUpdateTodo(
                    state.todos[todoId].id,
                    state.todos[todoId].task,
                    !state.todos[todoId].done
                  )
                }
              />
              {state.todos[todoId].done ? (
                <span className="checked-todo">
                  <s>{state.todos[todoId].task}</s>{" "}
                </span>
              ) : (
                <span className="unchecked-todo">
                  {state.todos[todoId].task}
                </span>
              )}
              <a
                href="#"
                onClick={() => handleDeleteTodo(state.todos[todoId].id)}
              >
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
            value={newTodo}
            placeholder="Add a todo"
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </form>
        {error && <p>{error.error}</p>}
      </div>
    </div>
  );
};

export default MainPage;
