import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchPostLogin } from "../../services/userservices";
import SignUp from "./SignUp";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchPostLogin(emailId, password);
      setError("");
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
      setIsLoggedIn(false);
    }
  };

  const navigatePage = () => {
    return <SignUp setIsLoggedIn={setIsLoggedIn} />;
  };

  return (
    <div className="credential-container">
      <span className="subtitle">LOGIN WITH YOUR DETAILS</span>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <label>Email Id</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <span className="text">
            Not Registered yet ?{" "}
            <Link to="/signup" onClick={navigatePage}>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      {error && <span className="error-field">{error}</span>}
    </div>
  );
};

export default Login;
