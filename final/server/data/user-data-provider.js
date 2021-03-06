const {
  readFromJson,
  writeToJson,
  checkIfFileExists,
  deleteFile,
} = require("./file-system-provider");
const User = require("../models/user");

const { getHabitTypeName } = require("../models/habit");

const createNewUser = (email, password, firstName, lastName) => {
  const user = new User(
    email,
    password,
    firstName,
    lastName,
    new Date(),
    new Date(),
    {}
  );
  const userFilePath = "./server/data/users/" + email + ".json";
  writeToJson(userFilePath, User.toJson(user));
};

const getUser = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  if (checkIfFileExists(userFilePath)) {
    const userJson = readFromJson(userFilePath);
    return User.fromJson(userJson);
  } else {
    return null;
  }
};

const deleteUser = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  if (checkIfFileExists(userFilePath)) {
    deleteFile(userFilePath);
  }
};

const updateUser = (user) => {
  user.updatedAt = new Date();
  const userFilePath = "./server/data/users/" + user.email + ".json";
  writeToJson(userFilePath, User.toJson(user));
};

const checkIfUserExists = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  return checkIfFileExists(userFilePath);
};

const checkIfUserHasHabit = (email, habitId) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  return user.habits[habitId] !== undefined;
};

const getUserHabitType = (email, habitId) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  return user.habits[habitId].habitType;
};

const getUserHabits = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  let userHabits = {};
  for (const habitId in user.habits) {
    const habitTypeName = getHabitTypeName(user.habits[habitId].habitType);
    const habitName = user.habits[habitId].habitName;
    userHabits[habitId] = {
      habitId: habitId,
      habitType: habitTypeName,
      habitName: habitName,
    };
  }

  return userHabits;
};

module.exports = {
  createNewUser,
  checkIfUserExists,
  getUser,
  deleteUser,
  updateUser,
  checkIfUserHasHabit,
  getUserHabitType,
  getUserHabits,
};
