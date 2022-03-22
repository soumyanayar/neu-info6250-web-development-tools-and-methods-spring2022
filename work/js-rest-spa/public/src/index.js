"use strict";

(function () {
  let inventory = {};

  const MESSAGES = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Something went wrong.  Please try again",
  };

  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();

  function setLoggedIn(isLoggedIn) {
    const loginEl = document.getElementById("main");
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

  const inventoryEl = document.getElementById("inventory-div");

  function render() {
    // add an input field and increment button and decrement button in the inventory-div
    const html = `
      <input type="number" id="item-value" placeholder="Item Name">
      <button id="increment-btn">+</button>
      <button id="decrement-btn">-</button>
    `;
    inventoryEl.innerHTML = html;

    // The value in input field is initially set to 0
    const itemNameEl = document.getElementById("item-value");
    itemNameEl.value = 0;
    incrementBtn.addEventListener("click", () => {
      const itemVal = itemNameEl.value;
      itemVal++;
    });
    decrementBtn.addEventListener("click", () => {
      const itemVal = itemNameEl.value;
      if (itemVal > 0) {
        itemVal--;
      } else {
        itemVal = 0;
      }
    });
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

  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({ error: "networkError" });
        }
        return res.json();
      });
  }

  function fetchLogout() {
    return fetch("/api/session", {
      method: "DELETE",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({ error: "networkError" });
        }
        return res.json();
      });
  }

  function fetchSession() {
    return fetch("/api/session", {
      method: "GET",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({ error: "networkError" });
        }
        return res.json();
      });
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

  function checkForSession() {
    fetchSession()
      .then(renderOnLogin)
      .catch((error) => renderStatus(error));
  }
  function renderOnLogin(inventoryValue) {
    inventory = inventoryValue;
    setLoggedIn(true);
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", (e) => {
      inventory = {};
      fetchLogout()
        .then(() => setLoggedIn(false))
        .catch((error) => renderStatus(error));
    });
  }
})();
