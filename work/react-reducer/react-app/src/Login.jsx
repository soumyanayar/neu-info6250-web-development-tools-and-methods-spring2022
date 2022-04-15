import { fetchLogin } from "./services";
import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { useState } from "react";

const Login = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");

  const fetchPostSession = () => {
    fetchLogin(username)
      .then((todos) => {
        dispatch({ type: "LOGIN", todos });
        setError("");
      })
      .catch((error) => {
        if (error.error === "auth-insufficient") {
          setError("Dog is not authorized to login");
        } else if (error.error === "required-username") {
          setError("Please enter a valid username");
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPostSession();
  };

  return (
    <div className="login-div">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username:
          <input
            placeholder="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
