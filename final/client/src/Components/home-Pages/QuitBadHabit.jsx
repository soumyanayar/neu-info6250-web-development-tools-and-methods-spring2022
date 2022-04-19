import { useState } from "react";

const QuitBadHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
  return (
    <div className="container-div">
      <div className="form-div">
        <form>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          ></input>
          <label for="start">Start Date:</label>
          <input
            type="date"
            id="start-date"
            name="trip-start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <button className="save-btn" type="submit">
            Save Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuitBadHabit;
