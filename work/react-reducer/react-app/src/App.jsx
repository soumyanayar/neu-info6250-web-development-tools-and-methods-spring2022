import { useState, useEffect, useReducer } from "react";
import { fetchSession } from "./services";
import { reducer, initialState } from "./reducer";
import loginContext from "./loginContext";
import titleContext from "./titleContext";
import todosContext from "./todosContext";
import MainPage from "./MainPage";
import Login from "./Login";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");

  const fetchUserFromSession = () => {
    fetchSession()
      .then((username) => {
        const user = username.username;
        dispatch({ type: "FETCH_USER", user });
        console.log(user);
      })
      .catch((error) => {
        setError(error);
      });
  };
  // console.log(state);
  console.log(state);

  useEffect(() => {
    fetchUserFromSession();
  }, []);

  if (state.isLoggedIn) {
    return (
      <div>
        <MainPage dispatch={dispatch} state={state} />
      </div>
    );
  } else {
    return (
      <loginContext.Provider value={{ dispatch }}>
        <Login />
      </loginContext.Provider>
    );
  }
}

export default App;
