import { useState, useEffect } from "react";
import { getHabitsGoalStatus } from "../../utils/habitStatusChecker";

const Calendar = ({ month, year, habit, habitType, habitLogs }) => {
    const [activeYear, setActiveYear] = useState(year);
    const [activeMonth, setActiveMonth] = useState(month);
    const [habitLogsForTheDay, setHabitLogsForTheDay] = useState({});
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

    const getFullMonth = (month) => {
        if (month < 10) {
            return `0${month}`;
        } else {
            return month;
        }
    };

    const getHabitLogsPerDay = () => {
        const habitLogsPerDay = {};
        for (let i = 0; i < habitLogs.length; i++) {
            const dateObj = new Date(habitLogs[i].date);
            const date =
                dateObj.getFullYear() +
                "-" +
                getFullMonth(dateObj.getMonth() + 1) +
                "-" +
                (dateObj.getDate() < 10
                    ? `0${dateObj.getDate()}`
                    : dateObj.getDate());
            if (habitLogsPerDay[date]) {
                habitLogsPerDay[date].push(habitLogs[i]);
            } else {
                habitLogsPerDay[date] = [habitLogs[i]];
            }
        }
        return habitLogsPerDay;
    };

    const printDailyLogInFriendlyWay = (habitLog) => {
        let beautifiedLog = "";
        if (!habitLog) {
            return beautifiedLog;
        }
        switch (habitType) {
            case "CreateGoodHabit":
            case "LimitBadHabit":
                for (let i = 0; i < habitLog.length; i++) {
                    beautifiedLog +=
                        habitLog[i].number +
                        " " +
                        habitLog[i].unit +
                        " on " +
                        habitLog[i].date.split("T")[0];
                }
                break;
            case "QuitBadHabit":
                for (let i = 0; i < habitLog.length; i++) {
                    beautifiedLog +=
                        (habitLog[i].isSuccess === "true"
                            ? "Successful"
                            : "Not Successful") +
                        " on " +
                        habitLog[i].date;
                }
                break;
            default:
                beautifiedLog = "";
        }
        return beautifiedLog;
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
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();
        const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let days = [];
        for (let index = 1; index <= daysInMonth; index++) {
            const date = new Date(activeYear, activeMonth, index)
                .toISOString()
                .split("T")[0];

            if (goalStatus.CompletedDays.includes(date)) {
                if (habitLogsForTheDay[date]) {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="succeeded">{index}</span>
                                <div className="dropdown-content">
                                    {printDailyLogInFriendlyWay(
                                        habitLogsForTheDay[date]
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                } else {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="succeeded">{index}</span>
                                <div className="dropdown-content">
                                    No Habit Logs available for this date
                                </div>
                            </div>
                        </li>
                    );
                }
            } else if (goalStatus.FailedDays.includes(date)) {
                if (habitLogsForTheDay[date]) {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="failed">{index}</span>
                                <div className="dropdown-content">
                                    {printDailyLogInFriendlyWay(
                                        habitLogsForTheDay[date]
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                } else {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="failed">{index}</span>
                                <div className="dropdown-content">
                                    No Habit Logs available for this date
                                </div>
                            </div>
                        </li>
                    );
                }
            } else if (goalStatus.PartialCompletedDays.includes(date)) {
                if (habitLogsForTheDay[date]) {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="partial">{index}</span>
                                <div className="dropdown-content">
                                    {printDailyLogInFriendlyWay(
                                        habitLogsForTheDay[date]
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                } else {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="partial">{index}</span>
                                <div className="dropdown-content">
                                    No Habit Logs available for this date
                                </div>
                            </div>
                        </li>
                    );
                }
            } else {
                days.push(
                    <li key={index}>
                        <div className="dropdown">
                            {index}
                            <div className="dropdown-content">
                                No Habit Logs available for this date
                            </div>
                        </div>
                    </li>
                );
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
        setGoalStatus(getHabitsGoalStatus(habit, habitType, habitLogs));
        setHabitLogsForTheDay(getHabitLogsPerDay());
    }, [activeMonth, activeYear, habit, habitType, habitLogs]);

    return (
        <div className="calender-container">
            <div className="month">
                <ul>
                    <li className="prev">
                        <button onClick={gotoPreviousMonth}>&#10094;</button>
                    </li>
                    <li className="next">
                        <button onClick={gotoNextMonth}>&#10095;</button>
                    </li>
                    <li>
                        {getMonthName(activeMonth)}{" "}
                        <span className="year">{activeYear}</span>
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
