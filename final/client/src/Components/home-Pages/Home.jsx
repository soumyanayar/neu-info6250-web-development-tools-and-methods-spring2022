import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchGetAllHabits,
  fetchDeleteSingleHabit,
} from "../../services/habitservices";
import ViewHabitDetailsAccordian from "./ViewHabitDetailsAccordian";
import AddHabitLogAccordian from "./AddHabitLogAccordian";

const Home = () => {
  const [allHabits, setAllHabits] = useState({});
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  const getAllHabits = async () => {
    try {
      const fetchedHabitIds = await fetchGetAllHabits();
      setAllHabits(fetchedHabitIds);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteSingleHabit = async (key) => {
    try {
      await fetchDeleteSingleHabit(key);
      setUpdated(!updated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHabits();
  }, [updated]);

  if (allHabits.length === 0) {
    return (
      <div>
        <span className="home-title">Welcome to Habit Tracker</span>
        <p>
          To get started, create a new habit by clicking <Link>Add habit</Link>
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="home-title"> You have below habits so far !!</p>
      <div className="all-habit-container">
        <ul className="all-habit-list">
          {Object.entries(allHabits).map(([key, value]) => {
            return (
              <li key={key}>
                <div className="habit-container-div">
                  <p className="habit-name-title">
                    <b>{value.habitName} </b>
                  </p>
                  <div className="accordion-holder-div">
                    <ViewHabitDetailsAccordian
                      habitId={value.habitId}
                      habitType={value.habitType}
                    />
                    <AddHabitLogAccordian
                      habitId={value.habitId}
                      habitType={value.habitType}
                    />
                  </div>
                  <button
                    className="delete-habit-btn"
                    onClick={() => handleDeleteSingleHabit(key)}
                  >
                    DELETE HABIT
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
