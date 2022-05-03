import { useState, useEffect } from "react";
import {
    fetchGetSingleHabit,
    fetchGetLogsOfAHabit,
} from "../../services/habitservices";
import { getHabitStatusPieChartData } from "../../utils/habitStatusChecker";
import Calendar from "./Calendar";
import Piechart from "./Piechart";

const ViewHabitDetailsAccordian = ({ habitId, habitType, setIsLoggedIn }) => {
    const [isEntryOpen, setIsEntryOpen] = useState({});
    const [habit, setHabit] = useState({
        startDate: new Date().toISOString(),
    });
    const [habitLogs, setHabitLogs] = useState([]);
    const [pieChartData, setPieChartData] = useState({
        degree1: 0,
        degree2: 0,
        degree3: 0,
        degree4: 0,
        degree5: 0,
    });
    const [error, setError] = useState("");

    function toggleEntry(habitId) {
        setIsEntryOpen({
            ...isEntryOpen,
            [habitId]: !isEntryOpen[habitId],
        });
    }
    const isOpen = isEntryOpen[habitId];

    const getHabitDetails = async () => {
        let fetchedHabit;
        let fetchedHabitLogs;
        try {
            fetchedHabit = await fetchGetSingleHabit(habitId);
            setHabit(fetchedHabit);
            setError("");
        } catch (error) {
            setError(error.message);
            if (
                error.message === "You have not logged in, please login" ||
                error.message ===
                    "Your login session has expired, please login again"
            ) {
                setIsLoggedIn(false);
            }
        }

        try {
            fetchedHabitLogs = await fetchGetLogsOfAHabit(habitId);
            setHabitLogs(fetchedHabitLogs);
            setError("");
        } catch (error) {
            setError(error.message);
            if (
                error.message === "You have not logged in, please login" ||
                error.message ===
                    "Your login session has expired, please login again"
            ) {
                setIsLoggedIn(false);
            }
        }

        setPieChartData(
            getHabitStatusPieChartData(
                fetchedHabit,
                habitType,
                fetchedHabitLogs
            )
        );
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

    const showHabitGoal = () => {
        switch (habitType) {
            case "CreateGoodHabit":
                return `Habit Goal: Minimum ${habit.goal} ${habit.unit} ${habit.duration}`;
            case "LimitBadHabit":
                return `Habit Goal: Maximum ${habit.goal} ${habit.unit} ${habit.duration}`;

            case "QuitBadHabit":
            default:
                return "";
        }
    };

    useEffect(() => {
        getHabitDetails();
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
                    <div className="habit-detail-accord-div">
                        <div>HabitType: {getFriendlyNameForHabitType()} </div>
                        <div>
                            Habit Start Date: {habit.startDate.split("T")[0]}
                        </div>
                        {showHabitGoal()}
                    </div>
                    <div className="inline-block-div">
                        <Calendar
                            month={new Date().getMonth()}
                            year={new Date().getFullYear()}
                            habit={habit}
                            habitType={habitType}
                            habitLogs={habitLogs}
                        />
                        <Piechart data={pieChartData} />
                    </div>
                </div>
            </div>
            {error && <span className="error-field">{error}</span>}
        </div>
    );
};

export default ViewHabitDetailsAccordian;
