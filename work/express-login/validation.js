const validateUserName = (username) => {
  if (username.length < 3 || username.length > 20) {
    return false;
  }
  if (username === "dog") {
    return false;
  }
  return true;
};

module.exports = validateUserName;
