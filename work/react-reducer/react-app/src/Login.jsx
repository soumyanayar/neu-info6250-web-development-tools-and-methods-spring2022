import { fetchLogin } from "./services";
import { useContext } from "react";
import { useState } from "react";
import loginContext from "./loginContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(loginContext);
  const fetchPostSession = () => {
    fetchLogin(username)
      .then((todos) => {
        dispatch({ type: "LOGIN", user: username });
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
