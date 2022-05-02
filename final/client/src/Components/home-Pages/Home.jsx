import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGetAllHabits } from "../../services/habitservices";
import ViewHabitDetailsAccordian from "./ViewHabitDetailsAccordian";
import AddHabitLogAccordian from "./AddHabitLogAccordian";
import DeleteSingleModal from "../modals/DeleteSingleHabitModal";

const Home = () => {
  const [allHabits, setAllHabits] = useState({});
  const [error, setError] = useState("");
  const [deleteHabitModalOpen, setDeleteHabitModalOpen] = useState(false);
  const [habitKey, setHabitKey] = useState(0);

  const getAllHabits = async () => {
    try {
      const fetchedHabitIds = await fetchGetAllHabits();
      setAllHabits(fetchedHabitIds);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = (habitKey) => {
    setHabitKey(habitKey);
    setDeleteHabitModalOpen(true);
  };

  useEffect(() => {
    getAllHabits();
  }, [deleteHabitModalOpen]);

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
        {deleteHabitModalOpen && (
          <DeleteSingleModal
            habitKey={habitKey}
            setDeleteHabitModalOpen={setDeleteHabitModalOpen}
          />
        )}
        <ul className="all-habit-list">
          {Object.entries(allHabits).map(([key, value]) => {
            return (
              <li key={key}>
                <div className="habit-container-div">
                  <p className="habit-name-title">
                    <b>
                      {value.habitName}{" "}
                      <button
                        className="delete-habit-btn"
                        onClick={() => handleDelete({ key })}
                      >
                        X
                      </button>
                    </b>
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
