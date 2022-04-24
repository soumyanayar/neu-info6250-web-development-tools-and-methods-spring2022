import { useState, useEffect } from "react";

const Calendar = ({ month, year, habit, habitLogs }) => {
    const [activeYear, setActiveYear] = useState(year);
    const [activeMonth, setActiveMonth] = useState(month);
    const [activeDaysOfMonth, setActiveDaysOfMonth] = useState([]);

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

    const getActiveDaysFromHabitLogs = () => {
        const activeDays = [];
        habitLogs.forEach((habitLog) => {
            const date = new Date(habitLog.date);
            if (
                date.getMonth() === activeMonth &&
                date.getFullYear() === activeYear
            ) {
                activeDays.push(date.getDate());
            }
        });
        return activeDays;
    };

    const addEmptyDaysUntilFirstDayOfTheMonth = () => {
        const firstDayOfTheMonth = new Date(activeYear, activeMonth, 1);
        const daysToSkip = firstDayOfTheMonth.getDate();

        let emptyDays = [];
        for (let index = 0; index < daysToSkip - 1; index++) {
            emptyDays.push(<li key={index}></li>);
        }

        return emptyDays;
    };

    const addDaysOfMonth = () => {
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();
        const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let days = [];
        console.log(`Active Days: ${activeDaysOfMonth}`);
        for (let index = 1; index <= daysInMonth; index++) {
            if (activeDaysOfMonth.includes(index - 1)) {
                days.push(
                    <li key={index}>
                        <span class="active">{index}</span>
                    </li>
                );
            } else if (activeMonth == currentMonth && index == currentDay) {
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
        setActiveDaysOfMonth(getActiveDaysFromHabitLogs());
    }, [activeMonth, activeYear, habit, habitLogs]);

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
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>

            <ul className="days">
                {addEmptyDaysUntilFirstDayOfTheMonth()}
                {addDaysOfMonth()}
            </ul>
        </div>
    );
};

export default Calendar;
