"use strict";
(function () {
  // We store these as an object because we will access by id
  let stateInventory = undefined;

  // These messages are incomplete and just to demonstrate the technique
  // you will have to expand to cover your scenarios!
  const MESSAGES = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Something went wrong.  Please try again",
  };

  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  addAbilityToIncrementInventory();
  addAbilityToDecrementInventory();

  /////////////////////////////////
  function setLoggedIn(isLoggedIn) {
    // Notice how more complicated this is because we're not basing this off of state data
    // Not just here, but in the places we have to change our login status
    const loginEl = document.querySelector("main");
    if (isLoggedIn) {
      loginEl.classList.remove("not-logged-in");
      loginEl.classList.add("logged-in");
    } else {
      loginEl.classList.add("not-logged-in");
      loginEl.classList.remove("logged-in");
    }
    render();
    renderStatus("");
  }

  function renderOnLogin(inventory) {
    stateInventory = inventory;
    setLoggedIn(true);
  }

  function checkForSession() {
    fetchSession()
      .then(populateInventory)
      .catch(() => setLoggedIn(false));
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector(".login button");
    const usernameEl = document.querySelector(".login__username");
    buttonEl.addEventListener("click", (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
        .then(renderOnLogin)
        .catch((error) => renderStatus(error));
    });
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", (e) => {
      stateInventory = undefined;
      fetchLogout()
        .then(() => setLoggedIn(false))
        .catch((error) => renderStatus(error));
    });
  }

  function populateInventory() {
    fetchInventory()
      .then((inventory) => {
        stateInventory = inventory;
        setLoggedIn(true);
        render();
        renderStatus("");
      })
      .catch((error) => {
        renderStatus(error);
      });
  }

  function addAbilityToIncrementInventory() {
    const buttonEl = document.querySelector(".increment");
    buttonEl.addEventListener("click", (e) => {
      fetchUpdateInventory(stateInventory + 1)
        .then((inventory) => {
          stateInventory = inventory;
          render();
          renderStatus("");
        })
        .catch((error) => renderStatus(error));
    });
  }

  function addAbilityToDecrementInventory() {
    const buttonEl = document.querySelector(".decrement");
    buttonEl.addEventListener("click", (e) => {
      fetchUpdateInventory(stateInventory - 1)
        .then((inventory) => {
          stateInventory = inventory;
          render();
          renderStatus("");
        })
        .catch((error) => renderStatus(error));
    });
  }

  function fetchUpdateInventory(inventory) {
    return fetch("/api/inventory", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ inventory }),
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

  function fetchInventory() {
    return fetch("/api/inventory")
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

  function fetchSession() {
    return fetch("/api/session", {
      method: "GET",
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

  function fetchLogout() {
    return fetch("/api/session", {
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

  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ username }),
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

  function render() {
    const decrementButton = document.querySelector(".decrement");
    if (stateInventory <= 0) {
      decrementButton.disabled = true;
    } else {
      decrementButton.disabled = false;
    }

    const inventoryVal = document.querySelector(".inventory-val");
    inventoryVal.value = stateInventory;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector(".status");
    if (!message) {
      statusEl.innerText = "";
      return;
    }
    const key = message?.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }
})();
