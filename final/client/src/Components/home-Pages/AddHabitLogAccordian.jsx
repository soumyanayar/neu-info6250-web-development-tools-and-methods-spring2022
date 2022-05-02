import { useState, useEffect } from "react";
import {
  fetchGetSingleHabit,
  fetchPostCreateGoodHabitLog,
  fetchPostLimitBadHabitLog,
  fetchPostQuitBadHabitLog,
} from "../../services/habitservices";

function AddHabitLogAccordian({ habitId, habitType }) {
  const [isEntryOpen, setIsEntryOpen] = useState({});
  const [error, setError] = useState("");
  const [habitLogNumber, setHabitLogNumber] = useState(1);
  const [habitLogDate, setHabitLogDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [habitLogIsSuccess, setHabitLogIsSuccess] = useState("Yes");
  const [habitUnit, setHabitUnit] = useState("times");
  const handleRadioGroupChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setHabitLogIsSuccess(target.value);
    }
  };

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
      if (habitType === "CreateGoodHabit" || habitType === "LimitBadHabit") {
        setHabitUnit(fetchedHabit.unit);
      }
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
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
            habitLogIsSuccess === "Yes" ? true : false,
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
              <div className="habit-data-log-div">
                <div className="habit-data-log-sub-div">
                  <input
                    className="habit-log-unit-input"
                    type="number"
                    min="1"
                    value={habitLogNumber}
                    placeholder={habitUnit}
                    onChange={(e) => setHabitLogNumber(e.target.value)}
                  ></input>
                  <span className="habit-log-unit-input-text">{habitUnit}</span>
                </div>
                <div>
                  <input
                    className="habit-log-date-input"
                    type="date"
                    value={habitLogDate}
                    onChange={(e) => setHabitLogDate(e.target.value)}
                  ></input>
                </div>
              </div>
            )}

            {habitType === "QuitBadHabit" && (
              <div className="habit-data-log-div">
                <div className="radio-btn-div">
                  <label>
                    <input
                      type="radio"
                      value="Yes"
                      checked={habitLogIsSuccess === "Yes"}
                      onChange={handleRadioGroupChange}
                    />
                    <span>Successful</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="No"
                      checked={habitLogIsSuccess === "No"}
                      onChange={handleRadioGroupChange}
                    />
                    <span>Not Successful</span>
                  </label>
                </div>
                <input
                  className="habit-log-date-input"
                  type="date"
                  value={habitLogDate}
                  onChange={(e) => setHabitLogDate(e.target.value)}
                ></input>
              </div>
            )}

            <button className="save-log" type="submit" onClick={handleSubmit}>
              SAVE LOG
            </button>
          </form>
        </div>
      </div>
      {error && <span className="error-field">{error}</span>}
    </div>
  );
}

export default AddHabitLogAccordian;
