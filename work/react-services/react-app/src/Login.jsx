import { fetchLogin } from "./services";
import React from "react";
import { useState, useEffect } from "react";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchPostSession = () => {
    fetchLogin(username).then((user) => {
      setUser(user);
      setIsLoggedIn(true);
    });
  };

  useEffect(() => {
    fetchPostSession();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPostSession();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
