import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./Components/login-signin/SignUp";
import Login from "./Components/login-signin/Login";
import Navbar from "./Components/home-Pages/Navbar";
import Home from "./Components/home-Pages/Home";
import AddHabit from "./Components/home-Pages/AddHabit";
import "./App.css";
import { fetchSession } from "./services";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const getUser = async () => {
    try {
      const response = await fetchSession();
      const user = await response.json();
      setUser(user);
      setError("");
    } catch {
      setUser({});
      setError("Something went wrong.. !");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      </Switch>
    </Router>
  );
};

export default App;
