import { useState, useEffect } from "react";
import {
  fetchGetSingleHabit,
  fetchPostCreateGoodHabitLog,
  fetchPostLimitBadHabitLog,
  fetchPostQuitBadHabitLog,
} from "../../services/habitservices";

function AddHabitLogAccordian({ habitId, habitType }) {
  const [isEntryOpen, setIsEntryOpen] = useState({});
  const [habit, setHabit] = useState({
    startDate: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const [habitLogNumber, setHabitLogNumber] = useState(0);
  const [habitLogDate, setHabitLogDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [habitLogIsSuccess, setHabitLogIsSuccess] = useState(false);
  const [habitUnit, setHabitUnit] = useState("times");

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
      if (habitType === "CreateGoodHabit" || habitType === "LimitBadHabit") {
        setHabitUnit(fetchedHabit.unit);
      }
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (habitType) {
        case "CreateGoodHabit":
          await fetchPostCreateGoodHabitLog(
            habitId,
            habitLogNumber,
            habitUnit,
            new Date(habitLogDate)
          );
          break;

        case "LimitBadHabit":
          await fetchPostLimitBadHabitLog(
            habitId,
            habitLogNumber,
            habitUnit,
            new Date(habitLogDate)
          );
          break;

        case "QuitBadHabit":
          await fetchPostQuitBadHabitLog(
            habitId,
            habitLogIsSuccess,
            new Date(habitLogDate)
          );
          break;

        default:
          console.log("Invalid habitType");
          break;
      }
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getHabitDetails();
  }, []);

  return (
    <div className="accordion">
      <div
        key={habitId}
        className={`accordion__entry ${isOpen ? "accordion__entry--open" : ""}`}
      >
        <button
          className="accordion__title"
          onClick={() => toggleEntry(habitId)}
        >
          Add Logs To Habit
        </button>
        <div className="accordion__body">
          <form>
            {(habitType === "CreateGoodHabit" ||
              habitType === "LimitBadHabit") && (
              <div className="habit-data-3">
                <input
                  type="number"
                  value={habitLogNumber}
                  placeholder="2"
                  onChange={(e) => setHabitLogNumber(e.target.value)}
                ></input>
                <div>{habitUnit}</div>
                <input
                  type="date"
                  value={habitLogDate}
                  onChange={(e) => setHabitLogDate(e.target.value)}
                ></input>
              </div>
            )}

            {habitType === "QuitBadHabit" && (
              <div className="habit-data-3">
                <input
                  type="date"
                  value={habitLogDate}
                  onChange={(e) => setHabitLogDate(e.target.value)}
                ></input>
              </div>
            )}

            <button className="save-btn" type="submit" onClick={handleSubmit}>
              Save Log!
            </button>
          </form>
        </div>
      </div>
      {error && <span className="error-field">{error}</span>}
    </div>
  );
}

export default AddHabitLogAccordian;
