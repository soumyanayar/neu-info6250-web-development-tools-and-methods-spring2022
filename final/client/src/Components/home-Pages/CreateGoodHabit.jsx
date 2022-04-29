import { useState } from "react";
import { fetchCreateNewGoodHabit } from "../../services/habitservices";

const CreateGoodHabit = () => {
    const [habitName, setHabitName] = useState("");
    const [goal, setGoal] = useState("");
    const [unit, setUnit] = useState("times");
    const [duration, setDuration] = useState("daily");
    const [startDate, setStartDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetchCreateNewGoodHabit(
                habitName,
                goal,
                unit,
                duration,
                new Date(startDate)
            );
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

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
                            <option value="times">Times</option>
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                            <option value="meters">Meters</option>
                            <option value="grams">Grams</option>
                        </select>
                        <select
                            name="unit"
                            id="units"
                            defaultValue={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        >
                            <option value={duration}>Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="start">Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            name="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        ></input>
                    </div>

                    <button
                        className="save-btn"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save Data!
                    </button>
                </form>
            </div>
            {error && <span className="error-field">{error}</span>}
        </div>
    );
};

export default CreateGoodHabit;
