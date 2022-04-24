const getDateOfFirstDayOfTheWeek = (d) => {
    const dateObj = new Date(d);
    const dayCount = dateObj.getDay();
    const dateOfFirstDay = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate() - dayCount
    );
    return dateOfFirstDay;
};

const getDateOfLastDayOfTheWeek = (d) => {
    const dateObj = new Date(d);
    const dayCount = 6 - dateObj.getDay();
    const dateOfLastDay = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate() + dayCount
    );
    return dateOfLastDay;
};

const getDatesArrayFromRange = (startDate, endDate) => {
    const datesArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        datesArray.push(currentDate);
        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
        );
    }
    return datesArray;
};

const getHabitsGoalStatus = (habit, habitType, habitLogs) => {
    const habitsGoalStatus = {
        CompletedDays: [],
        FailedDays: [],
        PartialCompletedDays: [],
    };

    if (habitType === "CreateGoodHabit") {
        if (habit.duration === "daily") {
            let habitLogsByDate = new Map();
            habitLogs.forEach((habitLog) => {
                const dateInObj = new Date(habitLog.date);
                if (habitLogsByDate.has(dateInObj)) {
                    habitLogsByDate.set(
                        dateInObj,
                        habitLogsByDate.get(dateInObj) + habitLog.number
                    );
                } else {
                    habitLogsByDate.set(dateInObj, habitLog.number);
                }
            });

            habitLogsByDate.forEach((value, key) => {
                if (value >= habit.goal) {
                    habitsGoalStatus.CompletedDays.concat(key);
                } else if (value > 0) {
                    habitsGoalStatus.PartialCompletedDays.concat(key);
                } else if (value === 0) {
                    habitsGoalStatus.FailedDays.concat(key);
                }
            });
        } else if (habit.duration === "weekly") {
            let habitLogsByWeek = new Map();
            habitLogs.forEach((habitLog) => {
                const dateOfFirstDayOfTheWeek = getDateOfFirstDayOfTheWeek(
                    habitLog.date
                );
                if (habitLogsByWeek.has(dateOfFirstDayOfTheWeek)) {
                    habitLogsByWeek.set(
                        dateOfFirstDayOfTheWeek,
                        habitLogsByWeek.get(dateOfFirstDayOfTheWeek) +
                            habitLog.number
                    );
                } else {
                    habitLogsByWeek.set(
                        dateOfFirstDayOfTheWeek,
                        habitLog.number
                    );
                }
            });

            habitLogsByWeek.forEach((value, key) => {
                const dateOfLastDayOfTheWeek = getDateOfLastDayOfTheWeek(key);
                const datesArray = getDatesArrayFromRange(
                    key,
                    dateOfLastDayOfTheWeek
                );
                if (value >= habit.goal) {
                    habitsGoalStatus.CompletedDays.push.apply(
                        habitsGoalStatus.CompletedDays,
                        datesArray
                    );
                } else if (value > 0) {
                    habitsGoalStatus.PartialCompletedDays.push.apply(
                        habitsGoalStatus.PartialCompletedDays,
                        datesArray
                    );
                } else if (value === 0) {
                    habitsGoalStatus.FailedDays.push.apply(
                        habitsGoalStatus.FailedDays,
                        datesArray
                    );
                }
            });
        } else {
            console.log("Error: Invalid habit duration");
        }
    } else if (habitType === "LimitBadHabit") {
        if (habit.duration === "daily") {
        } else if (habit.duration === "weekly") {
        } else {
            console.log("Error: Invalid habit duration");
        }
    } else if (habitType === "QuitBadHabit") {
    } else {
        console.log("Error: habitType not found");
    }
};

export default getHabitsGoalStatus;
