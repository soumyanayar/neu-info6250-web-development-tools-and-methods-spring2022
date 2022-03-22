//store the value of the inventory for user
let userInventory = {};

function setInventory(username, data) {
  userInventory[username] = data;
}

function getInventory(username) {
  return userInventory[username];
}

module.exports = { userInventory, setInventory, getInventory };
