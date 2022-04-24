import { useState, useEffect } from 'react';
import {fetchGetSingleHabit} from "../../services/habitservices";

function ViewHabitDetailsAccordian({habitId, habitType}) {
  const [isEntryOpen, setIsEntryOpen] = useState({});
  const [habit, setHabit] = useState({});
  const [error, setError] = useState("");

  function toggleEntry(habitId) {
    setIsEntryOpen({
      ...isEntryOpen,
      [habitId]: !isEntryOpen[habitId],
    });
  }
  const isOpen = isEntryOpen[habitId];

  const getHabitDetails = async () => {
    try {
      const fetchedHabit = await fetchGetSingleHabit(habitId);
      setHabit(fetchedHabit);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getFriendlyNameForHabitType = (habitType) => {
    switch (habitType) {
      case "CreateGoodHabit" : return "Create a Good Habit";
      case "LimitBadHabit" : return "Limit a Bad Habit";
      case "QuitBadHabit" : return "Quit a Bad Habit";
      default : return "";
    }
  };

  useEffect(() => {
    getHabitDetails();
  }, []);


  return (
    <div className="accordion">
          <div
            key={habitId}
            className={`accordion__entry ${isOpen ? 'accordion__entry--open' : '' }`}
          >
            <button
              className="accordion__title"
              onClick={ () => toggleEntry(habitId) }
            >
                View Habit Details
            </button>
            <div className="accordion__body">
                <div>HabitType: {getFriendlyNameForHabitType(habitType)} </div>
                <div>Habit Goal: {habit.goal} {habit.unit} {habit.duration}</div>
                <div>Habit Start Date: {habit.startDate}</div>
            </div>
          </div>
    </div>
  );
};

export default ViewHabitDetailsAccordian;