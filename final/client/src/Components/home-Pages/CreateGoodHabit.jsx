import { useState } from "react";

const CreateGoodHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [goal, setGoal] = useState("");
  const [unit, setUnit] = useState("times");
  const [duration, setDuration] = useState("daily");
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
              placeholder="Example : Meditation"
              onChange={(e) => setHabitName(e.target.value)}
            ></input>
          </div>
          <div className="habit-data-2">
            <label htmlFor="goal">Goal:</label>
            <input
              id="goal"
              type="number"
              value={goal}
              min="1"
              placeholder="1"
              onChange={(e) => setGoal(e.target.value)}
            ></input>
            <select
              name="unit"
              id="units"
              defaultValue={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value={unit}>Times</option>
              <option value="minutes">Minutes</option>
              <option value="hour">Hour</option>
              <option value="meter">Meter</option>
              <option value="km">kilometer</option>
              <option value="mg">miligram</option>
            </select>
            <select
              name="unit"
              id="units"
              defaultValue={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value={duration}>Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
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

export default CreateGoodHabit;
