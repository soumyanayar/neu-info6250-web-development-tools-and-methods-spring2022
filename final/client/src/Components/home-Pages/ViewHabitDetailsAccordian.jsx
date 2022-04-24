import { useState, useEffect } from "react";
import {
    fetchGetSingleHabit,
    fetchGetLogsOfAHabit,
} from "../../services/habitservices";
import Calendar from "./Calendar";

const ViewHabitDetailsAccordian = ({ habitId, habitType }) => {
    const [isEntryOpen, setIsEntryOpen] = useState({});
    const [habit, setHabit] = useState({});
    const [habitLogs, setHabitLogs] = useState([]);
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

    const getHabitLogs = async () => {
        try {
            const fetchedHabitLogs = await fetchGetLogsOfAHabit(habitId);
            setHabitLogs(fetchedHabitLogs);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    const getFriendlyNameForHabitType = () => {
        switch (habitType) {
            case "CreateGoodHabit":
                return "Create a Good Habit";
            case "LimitBadHabit":
                return "Limit a Bad Habit";
            case "QuitBadHabit":
                return "Quit a Bad Habit";
            default:
                return "";
        }
    };

    const addHabitGoalDiv = (habitType) => {
        switch (habitType) {
            case "CreateGoodHabit":
            case "LimitBadHabit":
                return `<div> Habit Goal: {habit.goal} {habit.unit} {habit.duration}</div>`;
            default:
                return "";
        }
    };

    useEffect(() => {
        getHabitDetails();
        getHabitLogs();
    }, []);

    return (
        <div className="accordion">
            <div
                key={habitId}
                className={`accordion__entry ${
                    isOpen ? "accordion__entry--open" : ""
                }`}
            >
                <button
                    className="accordion__title"
                    onClick={() => toggleEntry(habitId)}
                >
                    View Habit Details
                </button>
                <div className="accordion__body">
                    <div>HabitType: {getFriendlyNameForHabitType()} </div>
                    {addHabitGoalDiv()}
                    <div>Habit Start Date: {habit.startDate}</div>
                    <Calendar
                        month={new Date().getMonth()}
                        year={new Date().getFullYear()}
                        habit={habit}
                        habitType={habitType}
                        habitLogs={habitLogs}
                    />
                </div>
            </div>
            {error && <span className="error-field">{error}</span>}
        </div>
    );
};

export default ViewHabitDetailsAccordian;
