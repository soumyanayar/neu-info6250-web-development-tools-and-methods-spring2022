import { useState } from "react";

const LimitBadHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [goal, setGoal] = useState("");
  const [unit, setUnit] = useState("");
  const [duration, setDuration] = useState("");
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
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          ></input>
          <select
            name="unit"
            id="units"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="times" selected>
              Times
            </option>
            <option value="minutes">Minutes</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="meter">Meter</option>
            <option value="km">kilometer</option>
            <option value="mg">miligram</option>
          </select>
          <select
            name="unit"
            id="units"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="days" selected>
              Days
            </option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
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

export default LimitBadHabit;
