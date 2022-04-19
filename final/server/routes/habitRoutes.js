module.exports = (userData, habitData, sessions) => {
  const express = require("express");
  const habitRouter = express.Router();
  const { v4: uuidv4 } = require("uuid");
  const authenticateUser = require("../middlewares/authenticateUser")(
    userData,
    sessions
  );

  const {
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
  } = habitData;

  const { checkIfUserHasHabit, getUserHabitType, getUserHabits } = userData;

  const { HabitType } = require("../models/habit");

  habitRouter.post("/", authenticateUser, (req, res) => {
    // validate request
    if (!req.body.habitName) {
      return res.status(400).send("habitName is required");
    }

    if (!req.body.habitType) {
      return res.status(400).send("habitType is required");
    }

    if (
      req.body.habitType === "CreateGoodHabit" ||
      req.body.habitType === "LimitBadHabit"
    ) {
      if (!req.body.goal) {
        return res.status(400).send("goal is required");
      }

      if (!req.body.unit) {
        return res.status(400).send("unit is required");
      }

      if (!req.body.duration) {
        return res.status(400).send("duration is required");
      }
    }

    if (!req.body.startDate) {
      return res.status(400).send("startDate is required");
    }

    // create habit
    const { habitName, goal, unit, duration, startDate } = req.body;
    const userEmail = req.user.email;

    let habitId;

    switch (req.body.habitType) {
      case "CreateGoodHabit":
        habitId = newCreateGoodHabit(
          userEmail,
          habitName,
          goal,
          unit,
          duration,
          startDate
        );
        break;

      case "LimitBadHabit":
        habitId = newLimitBadHabit(
          userEmail,
          habitName,
          goal,
          unit,
          duration,
          startDate
        );
        break;

      case "QuitBadHabit":
        habitId = newQuitBadHabit(userEmail, habitName, startDate);
        break;

      default:
        return res.status(400).send("Invalid habitType");
    }

    // return habit id with 201
    return res.status(201).send({ habitId });
  });

  habitRouter.delete("/:habitId", authenticateUser, (req, res) => {
    const habitId = req.params.habitId;
    const userEmail = req.user.email;
    deleteHabit(userEmail, habitId);
    res.sendStatus(204);
  });

  habitRouter.get("/:habitId", authenticateUser, (req, res) => {
    const habitId = req.params.habitId;
    const userEmail = req.user.email;
    if (!checkIfUserHasHabit(userEmail, habitId)) {
      return res.status(404).send("Habit not found");
    }

    const habitType = getUserHabitType(userEmail, habitId);
    const habit = getHabit(habitId, habitType);
    res.status(200).json(habit);
  });

  habitRouter.get("/:habitId/log", authenticateUser, (req, res) => {
    const habitId = req.params.habitId;
    const userEmail = req.user.email;

    if (!checkIfUserHasHabit(userEmail, habitId)) {
      return res.status(404).send("Habit not found");
    }

    if (!checkIfHabitLogExists(habitId)) {
      return res.status(404).send("Habit log does not exist for this habit");
    }

    const habitType = getUserHabitType(userEmail, habitId);

    const habitLog = getHabitLog(habitId, habitType);
    res.status(200).json(habitLog);
  });

  habitRouter.post("/:habitId/log", authenticateUser, (req, res) => {
    const habitId = req.params.habitId;
    const userEmail = req.user.email;

    const habitType = getUserHabitType(userEmail, habitId);

    if (
      habitType === HabitType.CreateGoodHabit ||
      habitType === HabitType.LimitBadHabit
    ) {
      if (!req.body.number) {
        return res.status(400).send("number is required");
      }

      if (!req.body.unit) {
        return res.status(400).send("unit is required");
      }
    } else if (habitType === HabitType.QuitBadHabit) {
      if (!req.body.isSuccess) {
        return res.status(400).send("isSuccess is required");
      }
    }

    if (!req.body.date) {
      return res.status(400).send("date is required");
    }

    if (!checkIfUserHasHabit(userEmail, habitId)) {
      return res.status(404).send("Habit not found");
    }

    switch (habitType) {
      case HabitType.CreateGoodHabit:
        addGoodHabitLog(habitId, req.body.number, req.body.unit, req.body.date);
        break;
      case HabitType.LimitBadHabit:
        addLimitBadHabitLog(
          habitId,
          req.body.number,
          req.body.unit,
          req.body.date
        );
        break;
      case HabitType.QuitBadHabit:
        addQuitBadHabitLog(habitId, req.body.isSuccess, req.body.date);
        break;
      default:
        return res.status(400).send("Invalid habitType");
    }

    res.sendStatus(201);
  });

  habitRouter.get("/", authenticateUser, (req, res) => {
    const userEmail = req.user.email;
    const habits = getUserHabits(userEmail);
    res.status(200).json(habits);
  });

  // Delete all habits
  habitRouter.delete("/", authenticateUser, (req, res) => {
    const userEmail = req.user.email;
    deleteAllHabits(userEmail);
    res.sendStatus(204);
  });

  return habitRouter;
};
