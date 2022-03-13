const { invalidUserNameHtml } = require("./html-templates");

const validateUsername = (req, res, next) => {
  // regex for letters and numbers
  const regex = /^[a-zA-Z0-9]+$/;
  const { username } = req.body;
  if (!username || username.length < 1) {
    res.send(invalidUserNameHtml("Please enter a username"));
  } else if (!regex.test(username)) {
    res.send(
      invalidUserNameHtml(
        "Special characters are not allowed in the username field : " + username
      )
    );
  } else if (username.toLowerCase() === "dog") {
    res.send(
      invalidUserNameHtml(
        "Dog is not allowed in the username field : " + username
      )
    );
  } else {
    next();
  }
};

module.exports = { validateUsername };
