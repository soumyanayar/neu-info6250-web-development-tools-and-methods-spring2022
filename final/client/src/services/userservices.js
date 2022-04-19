const fetchGetUser = async () => {
  try {
    const response = await fetch("/v1/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchPostLogin = async (email, password) => {
  try {
    const response = await fetch("/v1/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "email and password can't be empty":
        throw new Error("Email and password can't be empty");

      case "email is not a valid email":
        throw new Error("Email you entered is not a valid email type");

      case "email or password is incorrect":
        throw new Error("Email or password is incorrect");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchCreateUser = async (email, password, firstName, lastName) => {
  try {
    const response = await fetch("/v1/user", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "createdAt and updatedAt fields should not be sent in the request body":
        throw new Error(
          "createdAt and updatedAt fields are not allowed in the create user request"
        );

      case "email, password, firstName, lastName can't be empty":
        throw new Error(
          "Email, password, firstName, lastName are required fields when creating a user"
        );

      case "email is not a valid email":
        throw new Error("Email you entered is not a valid email type");

      case "user already exists":
        throw new Error("This user already exists, please login");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchUpdateUser = async (email, password, firstName, lastName) => {
  try {
    const response = await fetch("/v1/user", {
      method: "PUT",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 204) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "email can't be changed":
        throw new Error("Email can't be changed");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchDeleteUser = async () => {
  try {
    const response = await fetch("/v1/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    // check of status code is no content
    if (response.status === 204) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchLogout = async () => {
  try {
    const response = await fetch("/v1/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.ok) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  fetchGetUser,
  fetchPostLogin,
  fetchCreateUser,
  fetchUpdateUser,
  fetchDeleteUser,
  fetchLogout,
};
