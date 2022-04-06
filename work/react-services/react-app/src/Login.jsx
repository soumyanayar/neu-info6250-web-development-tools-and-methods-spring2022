import { fetchLogin } from "./services";
import React from "react";
import { useState } from "react";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchPostSession = () => {
    fetchLogin(username).then((user) => {
      console.log("user:", user);
      setIsLoggedIn(true);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPostSession();
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
