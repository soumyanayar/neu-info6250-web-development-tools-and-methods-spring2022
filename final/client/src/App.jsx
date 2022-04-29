import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./Components/login-signin/SignUp";
import Login from "./Components/login-signin/Login";
import Navbar from "./Components/home-Pages/Navbar";
import Home from "./Components/home-Pages/Home";
import AddHabit from "./Components/home-Pages/AddHabit";
import Profile from "./Components/home-Pages/Profile";
import About from "./Components/home-Pages/About";
import "./App.css";
import { fetchGetUser } from "./services/userservices";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const getUser = async () => {
    try {
      const user = await fetchGetUser();
      setUser(user);
      setIsLoggedIn(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/signup">
            <SignUp setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add-habit">
          <AddHabit />
        </Route>
        <Route path="/about">
          <About />;
        </Route>
        <Route path="/profile">
          <Profile
            user={user}
            setUser={setUser}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
