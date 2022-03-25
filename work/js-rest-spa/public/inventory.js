"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.concat.js");

(function () {
  var stateInventory = undefined;
  var stateUser = undefined;
  var MESSAGES = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Something went wrong.  Please try again",
    "dog-not-allowed-in-username": "Dog is not allowed in username",
    "auth-insufficient": "Enter a valid username"
  };
  checkSession();

  function checkSession() {
    fetchSession().then(function (user) {
      stateUser = user.username;
      fetchInventory().then(function (inventory) {
        stateInventory = inventory;
        renderMain();
      }).catch(function (error) {
        renderStatus(error);
      });
    }).catch(function () {
      return renderLogin();
    });
  }

  function addAbilityToLogin() {
    var buttonEl = document.querySelector(".login-button");
    var usernameEl = document.querySelector(".login-username");
    buttonEl.addEventListener("click", function (e) {
      var username = usernameEl.value;
      fetchLogin(username).then(checkSession).catch(function (error) {
        return renderStatus(error);
      });
    });
  }

  function addAbilityToLogout() {
    var buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", function (e) {
      stateInventory = undefined;
      fetchLogout().then(function () {
        renderLogin();
      }).catch();
    });
  }

  function addAbilityToIncrementInventory() {
    var buttonEl = document.querySelector(".button-increment");
    buttonEl.addEventListener("click", function (e) {
      fetchUpdateInventory(stateInventory + 1).then(function (inventory) {
        stateInventory = inventory;
        renderMain();
      }).catch();
    });
  }

  function addAbilityToDecrementInventory() {
    var buttonEl = document.querySelector(".button-decrement");
    buttonEl.addEventListener("click", function (e) {
      fetchUpdateInventory(stateInventory - 1).then(function (inventory) {
        stateInventory = inventory;
        renderMain();
      }).catch();
    });
  }

  function fetchUpdateInventory(inventory) {
    return fetch("/api/inventory", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify({
        inventory: inventory
      })
    }).catch(function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json().catch(function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchInventory() {
    return fetch("/api/inventory").catch(function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json().catch(function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchSession() {
    return fetch("/api/session", {
      method: "GET"
    }).catch(function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json().catch(function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchLogout() {
    return fetch("/api/session", {
      method: "DELETE"
    }).catch(function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }

      return response.json().catch(function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify({
        username: username
      })
    }).catch(function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return;
      }

      return response.json().catch(function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  function renderLogin() {
    var loginEl = document.querySelector(".container");
    loginEl.innerHTML = "\n      <div class=\"login\">\n        <h1>Login</h1>\n        <input class=\"login-username\" type=\"text\" placeholder=\"username\">\n        <button class=\"login-button\">Login</button>\n        <div class=\"status\"></div>\n      </div>\n    ";
    addAbilityToLogin();
  }

  function renderMain() {
    var mainEl = document.querySelector(".container");
    mainEl.innerHTML = "\n      <div class=\"login\">\n      <div class=\"title\">\n        <h3>Welcome ".concat(stateUser, "</h3>\n        <button class=\"logout\">Logout</button>\n        </div>\n        <div class=\"inventory\">\n          <button class=\"button-decrement\">-</button>\n          <span class=\"inventory-count\">").concat(stateInventory, "</span>\n          <button class=\"button-increment\">+</button>\n        </div>     \n      </div>\n    ");
    addAbilityToIncrementInventory();
    addAbilityToDecrementInventory();
    addAbilityToLogout();
    var decrementButton = document.querySelector(".button-decrement");

    if (stateInventory <= 0) {
      decrementButton.disabled = true;
    } else {
      decrementButton.disabled = false;
    }
  }

  function renderStatus(message) {
    console.log(message);
    var statusEl = document.querySelector(".status");

    if (!message) {
      statusEl.innerText = "";
      return;
    }

    var key = message !== null && message !== void 0 && message.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }
})();