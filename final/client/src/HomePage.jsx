import { useState, useEffect } from "react";

const HomePage = () => {
  return (
    <div>
      <p>Welcome to HABITIZER</p>
      <p>Looks Like You have not LoggedIn</p>
      <span>New User ??</span> <a href="/signup">SignUp</a>
      <span>Existing User ??</span> <a href="/login">Login</a>
    </div>
  );
};

export default HomePage;
