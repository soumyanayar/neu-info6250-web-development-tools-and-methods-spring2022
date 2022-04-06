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
      console.log(user);
      setIsLoggedIn(true);
    });
  };

  useEffect(() => {
    fetchUserFromSession();
  }, []);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  }
  return <MainPage setUser={setUser} />;
}

export default App;
