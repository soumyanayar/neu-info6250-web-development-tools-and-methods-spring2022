import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchLogout } from "../../services/userservices";

const Navbar = ({ user, setIsLoggedIn }) => {
  const [error, setError] = useState("");
  const handleLogout = async () => {
    try {
      await fetchLogout();
      setIsLoggedIn(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="nav-title">
        <Link to="/">
          <h3>HABITIZER</h3>
        </Link>
      </div>
      <div className="nav-center">
        <ul className="nav-links">
          <li role="menuitem">
            <Link to="/">HOME</Link>
          </li>
          <li role="menuitem">
            <Link to="/add-habit">ADD HABIT</Link>
          </li>
          <li role="menuitem">
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
      <nav className="dropdown">
        <button type="button" className="drop-btn">
          {user.firstName} {""} {user.lastName}
        </button>
        <div className="dropdown-content">
          <li>
            <Link to="/profile">Profile</Link>{" "}
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
