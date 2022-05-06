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

export function getHabitsGoalStatus(habit, habitType, habitLogs) {
    const habitsGoalStatus = {
        CompletedDays: [],
        FailedDays: [],
        PartialCompletedDays: [],
    };

    if (
        habit == null ||
        Object.keys(habit).length === 0 ||
        habitType == null ||
        habitLogs == null ||
        habitLogs.length === 0
    ) {
        return habitsGoalStatus;
    }

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
                const dateToAdd = new Date(
                    key.getFullYear(),
                    key.getMonth(),
                    key.getDate()
                )
                    .toISOString()
                    .split("T")[0];
                if (value >= habit.goal) {
                    habitsGoalStatus.CompletedDays.push(dateToAdd);
                } else if (value > 0) {
                    habitsGoalStatus.PartialCompletedDays.push(dateToAdd);
                } else if (value === 0) {
                    habitsGoalStatus.FailedDays.push(dateToAdd);
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
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        habitsGoalStatus.CompletedDays.push(dateToAdd);
                    }
                } else if (value > 0) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        habitsGoalStatus.PartialCompletedDays.push(dateToAdd);
                    }
                } else if (value === 0) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        habitsGoalStatus.FailedDays.push(dateToAdd);
                    }
                }
            });
        } else {
            console.log(
                `Error: Invalid habit duration ${JSON.stringify(
                    habit
                )} ${JSON.stringify(habitType)} ${JSON.stringify(habitLogs)}`
            );
        }
    } else if (habitType === "LimitBadHabit") {
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
                const dateToAdd = new Date(
                    key.getFullYear(),
                    key.getMonth(),
                    key.getDate()
                )
                    .toISOString()
                    .split("T")[0];
                if (value <= habit.goal) {
                    habitsGoalStatus.CompletedDays.push(dateToAdd);
                } else if (value > habit.goal) {
                    habitsGoalStatus.FailedDays.push(dateToAdd);
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
                if (value <= habit.goal) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        habitsGoalStatus.CompletedDays.push(dateToAdd);
                    }
                } else if (value > habit.goal) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        habitsGoalStatus.FailedDays.push(dateToAdd);
                    }
                }
            });
        } else {
            console.log("Error: Invalid habit duration");
        }
    } else if (habitType === "QuitBadHabit") {
        habitLogs.forEach((habitLog) => {
            const dateInObj = new Date(habitLog.date);
            const dateToAdd = new Date(
                dateInObj.getFullYear(),
                dateInObj.getMonth(),
                dateInObj.getDate()
            )
                .toISOString()
                .split("T")[0];
            if (habitLog.isSuccess === "false") {
                habitsGoalStatus.FailedDays.push(dateToAdd);
            } else {
                habitsGoalStatus.CompletedDays.push(dateToAdd);
            }
        });
    } else {
        console.log("Error: habitType not found");
    }

    return habitsGoalStatus;
}

const getTotalDays = (startDate) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date();
    const totalDays = Math.ceil(
        (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24)
    );
    return totalDays;
};

const calculatePieAngle = (total, condition) => {
    const angle = (condition / total) * 360;
    return angle;
};

export function getHabitStatusPieChartData(habit, habitType, habitLogs) {
    const goalStatusDetails = getHabitsGoalStatus(habit, habitType, habitLogs);

    let totalDays = getTotalDays(habit.startDate);
    if (isNaN(totalDays)) {
        totalDays = 0;
    }

    let loggingSkippedDays =
        totalDays -
        (goalStatusDetails.CompletedDays.length +
            goalStatusDetails.FailedDays.length +
            goalStatusDetails.PartialCompletedDays.length);

    const goalStatusNumbers = {
        CompletedDays: goalStatusDetails.CompletedDays.length,
        FailedDays: goalStatusDetails.FailedDays.length,
        PartialCompletedDays: goalStatusDetails.PartialCompletedDays.length,
        TotalDays: totalDays,
        LoggingSkippedDays: loggingSkippedDays,
    };

    const goalStatusAngles = {
        CompletedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.CompletedDays
        ),
        FailedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.FailedDays
        ),
        PartialCompletedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.PartialCompletedDays
        ),
        LoggingSkippedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.LoggingSkippedDays
        ),
    };

    const degree1 = 0;
    const degree2 = degree1 + goalStatusAngles.CompletedDaysAngle;
    const degree3 = degree2 + goalStatusAngles.FailedDaysAngle;
    const degree4 = degree3 + goalStatusAngles.PartialCompletedDaysAngle;
    const degree5 = 360;

    const pieChartData = {
        degree1: degree1,
        degree2: degree2,
        degree3: degree3,
        degree4: degree4,
        degree5: degree5,
    };

    return pieChartData;
}
