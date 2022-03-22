const users = {};

function getUserData(username) {
  return users[username];
}

function addUserData(username, data) {
  users[username] = data;
}

module.exports = { getUserData, addUserData };
