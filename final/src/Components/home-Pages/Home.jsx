import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchGetAllHabits,
  fetchDeleteSingleHabit,
} from "../../services/habitservices";
import ViewHabitDetailsAccordian from "./ViewHabitDetailsAccordian";
import AddHabitLogAccordian from "./AddHabitLogAccordian";

const Home = ({ setIsLoggedIn }) => {
  const [allHabits, setAllHabits] = useState({});
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getAllHabits = async () => {
    try {
      const fetchedHabitIds = await fetchGetAllHabits();
      setAllHabits(fetchedHabitIds);
      setError("");
    } catch (error) {
      setError(error.message);
      if (
        error.message === "You have not logged in, please login" ||
        error.message === "Your login session has expired, please login again"
      ) {
        setIsLoggedIn(false);
      }
    }
  };

  const handleDeleteSingleHabit = async (key) => {
    try {
      await fetchDeleteSingleHabit(key);
      setUpdated(!updated);
      setError("");
    } catch (error) {
      setError(error.message);
      if (
        error.message === "You have not logged in, please login" ||
        error.message === "Your login session has expired, please login again"
      ) {
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getAllHabits();
      setIsPageLoading(false);
    }, 1000);
  }, [updated]);

  if (isPageLoading) {
    return <p className="loading-div">Loading..!</p>;
  } else if (Object.keys(allHabits).length === 0) {
    return (
      <div className="about-container">
        <p>Welcome to Habitizer!!</p>
        <p>
          To get started, click on <Link to="/add-habit">ADD HABIT</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
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
                      setIsLoggedIn={setIsLoggedIn}
                    />
                    <AddHabitLogAccordian
                      habitId={value.habitId}
                      habitType={value.habitType}
                      setIsLoggedIn={setIsLoggedIn}
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
          {error && <p className="error-message">{error}</p>}
        </ul>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
