const fetchSession = async () => {
  try {
    const response = await fetch("v1/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const message = await response.json();
      return Promise.reject(message);
    }
    const session = await response.json();
    return session;
  } catch (error) {
    error.message = "Oops! Something went wrong";
  }
};

// Fetch Login from server return the user using await and async
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
    if (!response.ok) {
      const message = await response.json();
      return Promise.reject(message);
    }
    const session = await response.json();
    return session;
  } catch (error) {
    error.message = "Oops! Something went wrong";
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
    if (!response.ok) {
      const message = await response.json();
      return Promise.reject(message);
    }
    const session = await response.json();
    return session;
  } catch (error) {
    error.message = "Oops! Something went wrong";
  }
};

function fetchUpdateUser(password, firstName, lastName) {
  return fetch("/v1/user", {
    method: "PUT",
    body: JSON.stringify({
      password,
      firstName,
      lastName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

function fetchDeleteUser() {
  return fetch("/v1/user", {
    method: "DELETE",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

const fetchLogout = async () => {
  try {
    const response = await fetch("/v1/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchSession,
  fetchPostLogin,
  fetchCreateUser,
  fetchUpdateUser,
  fetchDeleteUser,
  fetchLogout,
};
