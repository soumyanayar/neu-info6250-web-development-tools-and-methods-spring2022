"use strict";
(function () {
  let stateInventory = undefined;
  let stateUser = undefined;

  const MESSAGES = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Something went wrong.  Please try again",
    "dog-not-allowed-in-username": "Dog is not allowed in username",
    "auth-insufficient": "Enter a valid username",
  };

  checkSession();

  function checkSession() {
    fetchSession()
      .then((user) => {
        stateUser = user.username;
        fetchInventory()
          .then((inventory) => {
            stateInventory = inventory;
            renderMain();
          })
          .catch((error) => {
            renderStatus(error);
          });
      })
      .catch(() => renderLogin());
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector(".login-button");
    const usernameEl = document.querySelector(".login-username");
    buttonEl.addEventListener("click", (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
        .then(checkSession)
        .catch((error) => renderStatus(error));
    });
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", (e) => {
      stateInventory = undefined;
      fetchLogout()
        .then(() => {
          renderLogin();
        })
        .catch();
    });
  }

  function addAbilityToIncrementInventory() {
    const buttonEl = document.querySelector(".button-increment");
    buttonEl.addEventListener("click", (e) => {
      fetchUpdateInventory(stateInventory + 1)
        .then((inventory) => {
          stateInventory = inventory;
          updateInventoryCountDomInMain();
        })
        .catch();
    });
  }

  function addAbilityToDecrementInventory() {
    const buttonEl = document.querySelector(".button-decrement");
    buttonEl.addEventListener("click", (e) => {
      fetchUpdateInventory(stateInventory - 1)
        .then((inventory) => {
          stateInventory = inventory;
          updateInventoryCountDomInMain();
        })
        .catch();
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
          return;
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function renderLogin() {
    const loginEl = document.querySelector(".container");
    loginEl.innerHTML = `
      <div class="login">
        <h1>Login</h1>
        <input class="login-username" type="text" placeholder="username">
        <button class="login-button">Login</button>
        <div class="status"></div>
      </div>
    `;

    addAbilityToLogin();
  }

  function updateInventoryCountDomInMain() {
    const inventoryEl = document.querySelector(".inventory-count");
    inventoryEl.innerHTML = stateInventory;
  }

  function renderMain() {
    const mainEl = document.querySelector(".container");
    mainEl.innerHTML = `
      <div class="login">
      <div class="title">
        <h3>Welcome ${stateUser}</h3>
        <button class="logout">Logout</button>
        </div>
        <div class="inventory">
          <button class="button-decrement">-</button>
          <span class="inventory-count">${stateInventory}</span>
          <button class="button-increment">+</button>
        </div>     
      </div>
    `;
    addAbilityToIncrementInventory();
    addAbilityToDecrementInventory();
    addAbilityToLogout();
    const decrementButton = document.querySelector(".button-decrement");
    if (stateInventory <= 0) {
      decrementButton.disabled = true;
    } else {
      decrementButton.disabled = false;
    }
  }

  function renderStatus(message) {
    console.log(message);
    const statusEl = document.querySelector(".status");
    if (!message) {
      statusEl.innerText = "";
      return;
    }
    const key = message?.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }
})();
