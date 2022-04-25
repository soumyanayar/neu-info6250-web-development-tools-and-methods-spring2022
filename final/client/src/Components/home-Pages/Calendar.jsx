import { useState, useEffect } from "react";
import getHabitsGoalStatus from "../../utils/habitStatusChecker";

const Calendar = ({ month, year, habit, habitType, habitLogs }) => {
    const [activeYear, setActiveYear] = useState(year);
    const [activeMonth, setActiveMonth] = useState(month);
    const [goalMetDays, setGoalMetDays] = useState([]);
    const [goalFailedDays, setGoalFailedDays] = useState([]);
    const [goalStatus, setGoalStatus] = useState({
        CompletedDays: [],
        FailedDays: [],
        PartialCompletedDays: [],
    });

    const getMonthName = (month) => {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "";
        }
    };

    const getGoalMetDaysFromHabitLogs = () => {
        let goalReachedDays = [];
        habitLogs.forEach((habitLog) => {
            const date = new Date(habitLog.date);
            if (
                date.getMonth() === activeMonth &&
                date.getFullYear() === activeYear
            ) {
                goalReachedDays.push(date.getDate());
            }
        });

        return goalReachedDays;
    };

    const getGoalFailedDaysFromHabitLogs = () => {
        let goalNotReachedDays = [];
        if (habitType == "QuitBadHabit" && habitLogs.length > 0) {
            console.log("here");
        }
        habitLogs.forEach((habitLog) => {
            const date = new Date(habitLog.date);
            if (
                date.getMonth() === activeMonth &&
                date.getFullYear() === activeYear
            ) {
                if (
                    habitType === "QuitBadHabit" &&
                    habitLog.isSuccess === "false"
                ) {
                    goalNotReachedDays.push(date.getDate());
                }
            }
        });

        return goalNotReachedDays;
    };

    const addEmptyDaysUntilFirstDayOfTheMonth = () => {
        const firstDayOfTheMonth = new Date(activeYear, activeMonth, 1);
        const daysToSkip = firstDayOfTheMonth.getDay();

        let emptyDays = [];
        for (let index = 0; index < daysToSkip; index++) {
            emptyDays.push(<li key={index}></li>);
        }

        return emptyDays;
    };

    const addDaysOfMonth = () => {
        console.log(goalStatus);

        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();
        const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let days = [];
        console.log(`Goal Failed Days: ${goalFailedDays}`);
        for (let index = 1; index <= daysInMonth; index++) {
            if (goalFailedDays.includes(index - 1)) {
                days.push(
                    <li key={index}>
                        <span class="failed">{index}</span>
                    </li>
                );
            } else if (goalMetDays.includes(index - 1)) {
                days.push(
                    <li key={index}>
                        <span class="active">{index}</span>
                    </li>
                );
            } else if (activeMonth === currentMonth && index === currentDay) {
                days.push(
                    <li key={index}>
                        <span class="today">{index}</span>
                    </li>
                );
            } else {
                days.push(<li key={index}>{index}</li>);
            }
        }

        return days;
    };

    const gotoNextMonth = () => {
        if (activeMonth === 11) {
            setActiveMonth(0);
            setActiveYear(activeYear + 1);
        } else {
            setActiveMonth(activeMonth + 1);
        }
    };

    const gotoPreviousMonth = () => {
        if (activeMonth === 0) {
            setActiveMonth(11);
            setActiveYear(activeYear - 1);
        } else {
            setActiveMonth(activeMonth - 1);
        }
    };

    useEffect(() => {
        setGoalMetDays(getGoalMetDaysFromHabitLogs());
        setGoalFailedDays(getGoalFailedDaysFromHabitLogs());
        setGoalStatus(getHabitsGoalStatus(habit, habitType, habitLogs));
    }, [activeMonth, activeYear, habit, habitType, habitLogs]);

    return (
        <div>
            <div className="month">
                <ul>
                    <li className="prev">
                        <button onClick={gotoPreviousMonth}>&#10094;</button>
                    </li>
                    <li className="next">
                        <button onClick={gotoNextMonth}>&#10095;</button>
                    </li>
                    <li>
                        <div className="year">{activeYear}</div>
                        {getMonthName(activeMonth)}
                    </li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>

            <ul className="days">
                {addEmptyDaysUntilFirstDayOfTheMonth()}
                {addDaysOfMonth()}
            </ul>
        </div>
    );
};

export default Calendar;
