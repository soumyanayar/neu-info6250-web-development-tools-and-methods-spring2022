import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViewLog from "./ViewLog";
import { fetchGetAllHabits } from "../../services/habitservices";

const Home = () => {
  const [allHabits, setAllHabits] = useState({});
  const [habit, setHabit] = useState({});
  const [error, setError] = useState("");

  const getAllHabits = async () => {
    try {
      const fetchedHabitIds = await fetchGetAllHabits();
      setAllHabits(fetchedHabitIds);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const navigateToViewLog = (id) => {
    return <ViewLog id={id} />;
  };

  useEffect(() => {
    getAllHabits();
  }, []);

  if (allHabits.length === 0) {
    return (
      <div>
        <h1>Welcome to Habit Tracker</h1>
        <p>
          To get started, create a new habit by clicking <Link>Add habit</Link>
        </p>
      </div>
    );
  }
  return (
    <div>
      <h3> You have below habits so far !!</h3>
      <div>
        <ul>
          {Object.entries(allHabits).map(([key, value]) => {
            return (
              <li key={key}>
                <span>{value.habitName}</span>
                <button>Add Logs</button>
                <button onClick={() => navigateToViewLog({ key })}>View</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
