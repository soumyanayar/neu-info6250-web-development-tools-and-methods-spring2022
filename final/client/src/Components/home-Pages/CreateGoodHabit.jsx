import { useState } from "react";

const CreateGoodHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [goal, setGoal] = useState("");
  const [unit, setUnit] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState(Date.now());
  return (
    <div className="habit-container">
      <div className="form-div">
        <form>
          <div className="habit-data-1">
            <label for="habit-name">Habit Name:</label>
            <input
              type="text"
              value={habitName}
              placeholder="Example : Meditation"
              onChange={(e) => setHabitName(e.target.value)}
            ></input>
          </div>
          <div className="habit-data-2">
            <label for="goal">Goal:</label>
            <input
              id="goal"
              type="number"
              value={goal}
              min="0"
              placeholder="1"
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
                Daily
              </option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <div>
            <label for="start">Start Date:</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
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

export default CreateGoodHabit;
