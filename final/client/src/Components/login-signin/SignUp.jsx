import { useState, useEffect } from "react";
import { fetchCreateUser } from "../../services";
import { Link } from "react-router-dom";
import Login from "./Login";

const SignUp = ({ setIsLoggedIn }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchCreateUser(emailId, password, firstname, lastname);
      setIsLoggedIn(false);
      setIsUserCreated(true);
      //Redirect to Login Page"
    } catch (err) {
      console.log(err);
    }
  };

  const navigatePage = () => {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  };

  return (
    <div className="credential-container">
      <span className="subtitle">SIGNUP WITH YOUR DETAILS </span>
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
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <button type="submit">SIGNUP</button>
          <span>
            Existing User ?{" "}
            <Link to="/" onClick={navigatePage}>
              Login
            </Link>
          </span>
        </form>
      </div>
      {isUserCreated && (
        <span className="user-message">
          Account created Successfully!! Please click on{" "}
          <Link to="/" onClick={navigatePage}>
            Login
          </Link>{" "}
          to continue!!
        </span>
      )}
    </div>
  );
};

export default SignUp;
