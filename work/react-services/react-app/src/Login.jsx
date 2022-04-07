import { fetchLogin } from "./services";
import React, { useEffect } from "react";
import { useState } from "react";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchPostSession = () => {
    fetchLogin(username).then((user) => {
      console.log("user:", user);
    });
  };

  useEffect(() => {
    fetchPostSession();
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPostSession();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
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
