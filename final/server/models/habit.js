const HabitType = Object.freeze({
  CreateGoodHabit: 0,
  LimitBadHabit: 1,
  QuitBadHabit: 2,
});

const getHabitTypeName = (habitType) => {
  switch (habitType) {
    case HabitType.CreateGoodHabit:
      return "CreateGoodHabit";
    case HabitType.LimitBadHabit:
      return "LimitBadHabit";
    case HabitType.QuitBadHabit:
      return "QuitBadHabit";
    default:
      return null;
  }
};

class CreateGoodHabit {
  constructor(name, goal, unit, duration, startDate, userEmail) {
    this.name = name;
    this.goal = goal;
    this.unit = unit;
    this.duration = duration;
    this.startDate = startDate;
    this.userEmail = userEmail;
  }

  static fromJson(json) {
    const jsonObj = JSON.parse(json);
    return new CreateGoodHabit(
      jsonObj.name,
      jsonObj.goal,
      jsonObj.unit,
      jsonObj.duration,
      jsonObj.startDate,
      jsonObj.userEmail
    );
  }

  static toJson(createGoodHabit) {
    return JSON.stringify(createGoodHabit);
  }
}

class LimitBadHabit {
  constructor(name, goal, unit, duration, startDate, userEmail) {
    this.name = name;
    this.goal = goal;
    this.unit = unit;
    this.duration = duration;
    this.startDate = startDate;
    this.userEmail = userEmail;
  }

  static fromJson(json) {
    const jsonObj = JSON.parse(json);
    return new LimitBadHabit(
      jsonObj.name,
      jsonObj.goal,
      jsonObj.unit,
      jsonObj.duration,
      jsonObj.startDate,
      jsonObj.userEmail
    );
  }

  static toJson(limitBadHabit) {
    return JSON.stringify(limitBadHabit);
  }
}

class QuitBadHabit {
  constructor(name, startDate, userEmail) {
    this.name = name;
    this.startDate = startDate;
    this.userEmail = userEmail;
  }

  static fromJson(json) {
    const jsonObj = JSON.parse(json);
    return new QuitBadHabit(jsonObj.name, jsonObj.startDate, jsonObj.userEmail);
  }

  static toJson(quitBadHabit) {
    return JSON.stringify(quitBadHabit);
  }
}

class CreateGoodHabitLog {
  constructor(number, unit, date) {
    this.number = number;
    this.unit = unit;
    this.date = date;
  }

  static fromCsv(csv) {
    const csvObj = csv.split(",");
    return new CreateGoodHabitLog(csvObj[0], csvObj[1], csvObj[2]);
  }

  static toCsv(createGoodHabitLog) {
    return (
      createGoodHabitLog.number +
      "," +
      createGoodHabitLog.unit +
      "," +
      createGoodHabitLog.date
    );
  }
}

class LimitBadHabitLog {
  constructor(number, unit, date) {
    this.number = number;
    this.unit = unit;
    this.date = date;
  }

  static fromCsv(csv) {
    const csvObj = csv.split(",");
    return new LimitBadHabitLog(csvObj[0], csvObj[1], csvObj[2]);
  }

  static toCsv(limitBadHabitLog) {
    return (
      limitBadHabitLog.number +
      "," +
      limitBadHabitLog.unit +
      "," +
      limitBadHabitLog.date
    );
  }
}

class QuitBadHabitLog {
  constructor(isSuccess, date) {
    this.isSuccess = isSuccess;
    this.date = date;
  }

  static fromCsv(csv) {
    const csvObj = csv.split(",");
    return new QuitBadHabitLog(csvObj[0], csvObj[1]);
  }

  static toCsv(quitBadHabitLog) {
    return quitBadHabitLog.isSuccess + "," + quitBadHabitLog.date;
  }
}

module.exports = {
  HabitType,
  CreateGoodHabit,
  LimitBadHabit,
  QuitBadHabit,
  CreateGoodHabitLog,
  LimitBadHabitLog,
  QuitBadHabitLog,
  getHabitTypeName,
};
