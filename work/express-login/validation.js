const validateUserName = (username) => {
  // regex for letters and numbers
  const regex = /^[a-zA-Z0-9]+$/;

  if (username.length < 3 || username.length > 10) {
    return false;
  }
  if (!regex.test(username)) {
    return false;
  }
  if (username === "dog") {
    return false;
  }
  return true;
};

module.exports = validateUserName;
