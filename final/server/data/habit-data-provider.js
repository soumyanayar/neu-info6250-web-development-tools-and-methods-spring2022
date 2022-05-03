const { v4: uuidv4 } = require("uuid");

const {
  readFromJson,
  writeToJson,
  checkIfFileExists,
  readFromCsv,
  appendToCsv,
  deleteFile,
} = require("./file-system-provider");

const {
  HabitType,
  CreateGoodHabit,
  LimitBadHabit,
  QuitBadHabit,
  CreateGoodHabitLog,
  LimitBadHabitLog,
  QuitBadHabitLog,
} = require("../models/habit");

const User = require("../models/user");

const newCreateGoodHabit = (
  userEmail,
  habitName,
  goal,
  unit,
  duration,
  startDate
) => {
  const createGoodHabit = new CreateGoodHabit(
    habitName,
    goal,
    unit,
    duration,
    startDate,
    userEmail
  );
  const createGoodHabitJson = CreateGoodHabit.toJson(createGoodHabit);

  const habitId = uuidv4();
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  user.habits[habitId] = {
    habitId: habitId,
    habitType: HabitType.CreateGoodHabit,
    habitName: habitName,
  };
  writeToJson(userFilePath, User.toJson(user));

  const createGoodHabitFilePath = "./server/data/habits/" + habitId + ".json";
  writeToJson(createGoodHabitFilePath, createGoodHabitJson);
  return habitId;
};

const newLimitBadHabit = (
  userEmail,
  habitName,
  goal,
  unit,
  duration,
  startDate
) => {
  const limitBadHabit = new LimitBadHabit(
    habitName,
    goal,
    unit,
    duration,
    startDate,
    userEmail
  );
  const limitBadHabitJson = LimitBadHabit.toJson(limitBadHabit);

  const habitId = uuidv4();
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  user.habits[habitId] = {
    habitId: habitId,
    habitType: HabitType.LimitBadHabit,
    habitName: habitName,
  };
  writeToJson(userFilePath, User.toJson(user));

  const limitBadHabitFilePath = "./server/data/habits/" + habitId + ".json";
  writeToJson(limitBadHabitFilePath, limitBadHabitJson);
  return habitId;
};

const newQuitBadHabit = (userEmail, habitName, startDate) => {
  const quitBadHabit = new QuitBadHabit(habitName, startDate, userEmail);
  const quitBadHabitJson = QuitBadHabit.toJson(quitBadHabit);

  const habitId = uuidv4();
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  user.habits[habitId] = {
    habitId: habitId,
    habitType: HabitType.QuitBadHabit,
    habitName: habitName,
  };
  writeToJson(userFilePath, User.toJson(user));

  const quitBadHabitFilePath = "./server/data/habits/" + habitId + ".json";
  writeToJson(quitBadHabitFilePath, quitBadHabitJson);
  return habitId;
};

const deleteHabit = (userEmail, habitId) => {
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  delete user.habits[habitId];
  writeToJson(userFilePath, User.toJson(user));

  const habitFilePath = "./server/data/habits/" + habitId + ".json";
  if (checkIfFileExists(habitFilePath)) {
    deleteFile(habitFilePath);
  }

  const habitLogFilePath = "./server/data/habitlogs/" + habitId + ".csv";
  if (checkIfFileExists(habitLogFilePath)) {
    deleteFile(habitLogFilePath);
  }
};

const getHabit = (habitId, habitType, habitName) => {
  const habitFilePath = "./server/data/habits/" + habitId + ".json";
  const habitJson = readFromJson(habitFilePath);

  switch (habitType) {
    case HabitType.CreateGoodHabit:
      return CreateGoodHabit.fromJson(habitJson);

    case HabitType.LimitBadHabit:
      return LimitBadHabit.fromJson(habitJson);

    case HabitType.QuitBadHabit:
      return QuitBadHabit.fromJson(habitJson);

    default:
      return null;
  }
};

const checkIfHabitLogExists = (habitId) => {
  const habitLogFilePath = "./server/data/habitlogs/" + habitId + ".csv";
  return checkIfFileExists(habitLogFilePath);
};

const getHabitLog = (habitId, habitType) => {
  const habitLogFilePath = "./server/data/habitlogs/" + habitId + ".csv";
  const habitLogCSV = readFromCsv(habitLogFilePath);
  const habitLog = [];
  switch (habitType) {
    case HabitType.CreateGoodHabit:
      habitLogCSV.forEach((habitLogCSV) => {
        if (habitLogCSV.trim().length !== 0) {
          habitLog.push(CreateGoodHabitLog.fromCsv(habitLogCSV));
        }
      });
      return habitLog;

    case HabitType.LimitBadHabit:
      habitLogCSV.forEach((habitLogCSV) => {
        if (habitLogCSV.trim().length !== 0) {
          habitLog.push(LimitBadHabitLog.fromCsv(habitLogCSV));
        }
      });
      return habitLog;

    case HabitType.QuitBadHabit:
      habitLogCSV.forEach((habitLogCSV) => {
        if (habitLogCSV.trim().length !== 0) {
          habitLog.push(QuitBadHabitLog.fromCsv(habitLogCSV));
        }
      });
      return habitLog;

    default:
      return null;
  }
};

const addHabitLog = (habitId, habitLog) => {
  const habitLogFilePath = "./server/data/habitlogs/" + habitId + ".csv";
  appendToCsv(habitLogFilePath, habitLog + "\r\n");
};

const addGoodHabitLog = (habitId, number, unit, date) => {
  const habitLog = new CreateGoodHabitLog(number, unit, date);
  const habitLogCSV = CreateGoodHabitLog.toCsv(habitLog);
  addHabitLog(habitId, habitLogCSV);
};

const addLimitBadHabitLog = (habitId, number, unit, date) => {
  const habitLog = new LimitBadHabitLog(number, unit, date);
  const habitLogCSV = LimitBadHabitLog.toCsv(habitLog);
  addHabitLog(habitId, habitLogCSV);
};

const addQuitBadHabitLog = (habitId, isSuccess, date) => {
  const habitLog = new QuitBadHabitLog(isSuccess, date);
  const habitLogCSV = QuitBadHabitLog.toCsv(habitLog);
  addHabitLog(habitId, habitLogCSV);
};

const deleteAllHabits = (userEmail) => {
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  const habitIds = Object.keys(user.habits);
  habitIds.forEach((habitId) => {
    deleteHabit(userEmail, habitId);
  });

  user.habits = {};
  writeToJson(userFilePath, User.toJson(user));
};

module.exports = {
  newCreateGoodHabit,
  newLimitBadHabit,
  newQuitBadHabit,
  deleteHabit,
  getHabit,
  getHabitLog,
  addGoodHabitLog,
  addLimitBadHabitLog,
  addQuitBadHabitLog,
  deleteAllHabits,
  checkIfHabitLogExists,
};
