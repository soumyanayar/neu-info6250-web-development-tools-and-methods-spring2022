import React from "react";
import { useState, useEffect } from "react";
import { fetchSession } from "./services";
import MainPage from "./MainPage";
import Login from "./Login";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserFromSession = () => {
    fetchSession().then((user) => {
      console.log("username:", user.username);
      setUser(user.username);
      setIsLoggedIn(true);
    });
  };

  useEffect(() => {
    fetchUserFromSession();
  });

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={isLoggedIn} />;
  }
  return <MainPage setUser={user} setIsLoggedIn={isLoggedIn} />;
}

export default App;
