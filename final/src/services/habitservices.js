export const fetchCreateNewGoodHabit = async (
  habitName,
  goal,
  unit,
  duration,
  startDate
) => {
  try {
    const habitType = "CreateGoodHabit";
    const response = await fetch("/v1/user/habits", {
      method: "POST",
      body: JSON.stringify({
        habitName,
        habitType,
        goal,
        unit,
        duration,
        startDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 201) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "habitName is required":
        throw new Error("HabitName is required");

      case "goal is required":
        throw new Error("Goal is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "duration is required":
        throw new Error("Duration is required");

      case "startDate is required":
        throw new Error("StartDate is required");

      default:
        throw new Error("Something went wrong, please try again");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchLimitNewBadHabit = async (
  habitName,
  goal,
  unit,
  duration,
  startDate
) => {
  try {
    const habitType = "LimitBadHabit";
    const response = await fetch("/v1/user/habits", {
      method: "POST",
      body: JSON.stringify({
        habitName,
        habitType,
        goal,
        unit,
        duration,
        startDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();

    if (response.status === 201) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "habitName is required":
        throw new Error("HabitName is required");

      case "goal is required":
        throw new Error("Goal is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "duration is required":
        throw new Error("Duration is required");

      case "startDate is required":
        throw new Error("StartDate is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchQuitNewBadHabit = async (habitName, startDate) => {
  try {
    const habitType = "QuitBadHabit";
    const response = await fetch("/v1/user/habits", {
      method: "POST",
      body: JSON.stringify({
        habitName,
        habitType,
        startDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();

    if (response.status === 201) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");
      case "habitName is required":
        throw new Error("HabitName is required");

      case "startDate is required":
        throw new Error("StartDate is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchGetAllHabits = async () => {
  try {
    const response = await fetch("/v1/user/habits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();

    if (response.status === 200) {
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

export const fetchDeleteSingleHabit = async (habitId) => {
  try {
    const response = await fetch(`/v1/user/habits/${habitId}`, {
      method: "DELETE",
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

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchGetSingleHabit = async (habitId) => {
  try {
    const response = await fetch(`/v1/user/habits/${habitId}`, {
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

    console.log(responseJson);
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Habit not found":
        throw new Error("Habit not found");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchPostCreateGoodHabitLog = async (
  habitId,
  number,
  unit,
  date
) => {
  try {
    const response = await fetch(`/v1/user/habits/${habitId}/log`, {
      method: "POST",
      body: JSON.stringify({
        number,
        unit,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 201) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Habit not found":
        throw new Error("Selected habit not found");

      case "number is required":
        throw new Error("Number is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "date is required":
        throw new Error("Date is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchPostLimitBadHabitLog = async (
  habitId,
  number,
  unit,
  date
) => {
  try {
    const response = await fetch(`/v1/user/habits/${habitId}/log`, {
      method: "POST",
      body: JSON.stringify({
        number,
        unit,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 201) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Habit not found":
        throw new Error("Selected habit not found");

      case "number is required":
        throw new Error("Number is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "date is required":
        throw new Error("Date is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchPostQuitBadHabitLog = async (habitId, isSuccess, date) => {
  try {
    const response = await fetch(`/v1/user/habits/${habitId}/log`, {
      method: "POST",
      body: JSON.stringify({
        isSuccess,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 201) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Habit not found":
        throw new Error("Selected habit not found");

      case "isSuccess is required is required":
        throw new Error("isSuccess is required");

      case "date is required":
        throw new Error("Date is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchGetLogsOfAHabit = async (habitId) => {
  try {
    const response = await fetch(`/v1/user/habits/${habitId}/log`, {
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
      case "Habit not found":
        throw new Error("Selected habit not found");
      case "Habit log does not exist for this habit":
        console.log("Habit log does not exist for this habit");
        return [];
      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchDeleteAllHabits = async () => {
  try {
    const response = await fetch("/v1/user/habits", {
      method: "DELETE",
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
      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
