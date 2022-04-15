import { useState, useEffect, useReducer } from "react";
import { fetchSession } from "./services";
import { reducer, initialState } from "./reducer";
import loginContext from "./loginContext";
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
        dispatch({ type: "LOGIN", user });
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetchUserFromSession();
  }, []);

  if (state.isLoggedIn) {
    return <MainPage dispatch={dispatch} state={state} />;
  } else {
    return (
      <loginContext.Provider value={{ dispatch }}>
        <Login />
      </loginContext.Provider>
    );
  }
}

export default App;
