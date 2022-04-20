import { useState } from "react";

const QuitBadHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  return (
    <div className="habit-container">
      <div className="form-div">
        <form>
          <div className="habit-data-1">
            <label htmlFor="habit-name">Habit Name:</label>
            <input
              type="text"
              value={habitName}
              placeholder="Example : Smoking"
              onChange={(e) => setHabitName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="start">Start Date:</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
              format="yyyy-mm-dd"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <button className="save-btn" type="submit">
            Save Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuitBadHabit;
