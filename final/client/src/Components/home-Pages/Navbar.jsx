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
      <div className="nav-right">
        <span>{user.firstName}</span>
        <Link to="/">
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
