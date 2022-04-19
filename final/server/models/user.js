class User {
  constructor(
    email,
    password,
    firstName,
    lastName,
    createdAt,
    updatedAt,
    habits
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.habits = habits;
  }

  static fromJson(json) {
    const jsonObj = JSON.parse(json);
    return new User(
      jsonObj.email,
      jsonObj.password,
      jsonObj.firstName,
      jsonObj.lastName,
      jsonObj.createdAt,
      jsonObj.updatedAt,
      jsonObj.habits
    );
  }

  static toJson(user) {
    return JSON.stringify(user);
  }
}

module.exports = User;
