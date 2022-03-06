module.exports = (username) => {
  // regex for letters and numbers
  const regex = /^[a-zA-Z0-9]+$/;
  if (!username || username.length < 1) {
    const error = "Username is required";
    return [false, error];
  }

  if (!regex.test(username)) {
    const error =
      "Special characters are not allowed in the username field : " + username;
    return [false, error];
  }

  if (username.toLowerCase() === "dog") {
    const error = "Dog is not allowed in the username field : " + username;
    return [false, error];
  }
  return [true, ""];
};
