const bcrypt = require("bcrypt");

const hashifyPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  // now set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashifyPassword, comparePassword };
