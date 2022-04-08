import { fetchLogin } from "./services";
import React, { useEffect } from "react";
import { useState } from "react";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchPostSession = () => {
    fetchLogin(username)
      .then((user) => {
        setUser(user.username);
        setError("");
      })
      .catch((error) => {
        setError(error);
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
      {error && <p>{error.error}</p>}
    </div>
  );
};

export default Login;
