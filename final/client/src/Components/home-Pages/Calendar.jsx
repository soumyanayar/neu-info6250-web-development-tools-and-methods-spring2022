import { useState } from "react";

const Calendar = ({ month, year }) => {
    const [activeYear, setActiveYear] = useState(year);
    const [activeMonth, setActiveMonth] = useState(month);

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

    const addEmptyDaysUntilFirstDayOfTheMonth = () => {
        const firstDayOfTheMonth = new Date(activeYear, activeMonth, 1);
        const daysToSkip = firstDayOfTheMonth.getDay();

        let emptyDays = [];
        for (let index = 0; index < daysToSkip - 1; index++) {
            emptyDays.push(<li key={index}></li>);
        }

        return emptyDays;
    };

    const addDaysOfMonth = () => {
        const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let days = [];
        for (let index = 1; index <= daysInMonth; index++) {
            days.push(<li key={index}>{index}</li>);
        }

        return days;
    };

    return (
        <div>
            <div className="month">
                <ul>
                    <li className="prev">&#10094;</li>
                    <li className="next">&#10095;</li>
                    <li>
                        {getMonthName(activeMonth)}
                        <div className="year">{activeYear}</div>
                    </li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>

            <ul className="days">
                {addEmptyDaysUntilFirstDayOfTheMonth()}
                {addDaysOfMonth()}
            </ul>
        </div>
    );
};

export default Calendar;
