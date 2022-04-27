import { useState, useEffect } from "react";
import { fetchSession } from "./services";
import MainPage from "./MainPage";
import Login from "./Login";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingLoginPage, setIsLoadingLoginPage] = useState(true);

  const fetchUserFromSession = () => {
    fetchSession()
      .then((user) => {
        console.log("username:", user.username);
        setUser(user.username);
        setIsLoadingLoginPage(false);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoadingLoginPage(true);
      });
  };

  useEffect(() => {
    fetchUserFromSession();
  });

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  }
  return <MainPage user={user} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
