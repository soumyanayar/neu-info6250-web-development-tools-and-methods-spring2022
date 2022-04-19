import React from "react";
import { Link } from "react-router-dom";
import { fetchLogout } from "../../services";

const Navbar = ({ user, setIsLoggedIn }) => {
  const handleLogout = async () => {
    await fetchLogout();
    setIsLoggedIn(false);
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
        <span>{user.firstname}</span>
        <Link to="/">
          <button className="btn-login" onClick={handleLogout}>
            LOGOUT
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;