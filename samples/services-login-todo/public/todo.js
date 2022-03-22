"use strict";
(function() {
  // We store these as an object because we will access by id
  let stateTodos = {};

  // These messages are incomplete and just to demonstrate the technique
  // you will have to expand to cover your scenarios!
  const MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    default: 'Something went wrong.  Please try again',
  };

  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  addAbilityToRefresh();
  addAbilityToToggleComplete();
  addAbilityToAddTodo();
  addAbilityToRemoveTodo();

  /////////////////////////////////
  function setLoggedIn( isLoggedIn ) {
    // Notice how more complicated this is because we're not basing this off of state data
    // Not just here, but in the places we have to change our login status
    const loginEl = document.querySelector('main');
    if(isLoggedIn) {
      loginEl.classList.remove('not-logged-in');
      loginEl.classList.add('logged-in');
    } else {
      loginEl.classList.add('not-logged-in');
      loginEl.classList.remove('logged-in');
    }
    render();
    renderStatus('');
  }

  function renderOnLogin(todos) {
    stateTodos = todos;
    setLoggedIn(true);
  }

  function checkForSession() {
    fetchSession()
    .then( populateTodos )
    .catch( () => setLoggedIn(false) );
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector('.login button');
    const usernameEl = document.querySelector('.login__username');
    buttonEl.addEventListener('click', (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
      .then( renderOnLogin )
      .catch( error => renderStatus(error) );
    });
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector('.logout');
    buttonEl.addEventListener('click', (e) => {
      stateTodos = {};
      fetchLogout()
      .then( () => setLoggedIn(false) )
      .catch( error => renderStatus(error) );
    });
  }

  function populateTodos() {
    fetchTodos()
    .then( rawTodos => {
      stateTodos = rawTodos;
      setLoggedIn(true);
      render();
      renderStatus('');
    })
    .catch( error => {
      renderStatus(error);
    });
  }

  function addAbilityToAddTodo() {
    const buttonEl = document.querySelector('.add');
    const inputEl = document.querySelector('.to-add');
    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();
      const task = inputEl.value;
      fetchAddTodo(task)
      .then( todo => {
        inputEl.value = '';
        stateTodos[todo.id] = todo;
        render({ add: todo.id });
        renderStatus('');
      })
      .catch( err => {
        renderStatus(err);
      });
    });
  }

  function addAbilityToRemoveTodo() {
    const listEl = document.querySelector('.todos');
    listEl.addEventListener('click', (e) => {
      e.preventDefault();
      if(!e.target.classList.contains('todo__delete')) {
        return;
      }
      const id = e.target.dataset.id;
      fetchDeleteTodo(id)
      // Below is an alternate path, if we were "trusting" our in-app state to be
      // be as up-to-date as the server
      //
      // Different applications will have different assumptions
      //
      // .then( () => {
      //   delete stateTodos[id];
      //   render();
      //   renderStatus('');
      // })
      //
      // Instead, we will ask the server for an update and rerender with those results
      .then( populateTodos )
      .catch( err => {
        renderStatus(err);
      });
    });
  }

  function addAbilityToToggleComplete() {
    const listEl = document.querySelector('.todos');
    listEl.addEventListener('click', (e) => {
      console.log(e.target);
      if(!e.target.classList.contains('todo__toggle')) {
        return;
      }

      const id = e.target.dataset.id;
      console.log(id);
      fetchUpdateTodo(id, { done: !stateTodos[id].done } )
      .then( todo => {
        stateTodos[id] = todo;
        render();
        renderStatus('');
      })
      .catch( err => {
        renderStatus(err);
      });

    });
  }

  function addAbilityToRefresh() {
    const buttonEl = document.querySelector('.refresh');
    buttonEl.addEventListener('click', () => {
      populateTodos();
    });
  }

  function fetchAddTodo(task) {
    return fetch('/api/todos', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { task } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchDeleteTodo(id) {
    return fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchUpdateTodo( id, todoUpdates ) {
    return fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( todoUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchTodos() {
    return fetch('/api/todos')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function render( { add } = {} ) {
    const html = Object.values(stateTodos).map( todo => {
      const isDoneClass = todo.done ? "todo__text--complete" : "";
      const isAddedClass = add === todo.id ? "todo__text--added" : "";
      return `
      <li class="todo">
        <label
        >
          <input
            class="todo__toggle"
            data-id="${todo.id}"
            type="checkbox"
            ${todo.done ? "checked" : ""}
          >
          <span
            data-id="${todo.id}"
            class="todo__toggle todo__text ${ isDoneClass } ${isAddedClass} "
          >
            ${todo.task}
          </span>
        </label>
        <button
          data-id="${todo.id}"
          class="todo__delete"
        >
          &#10060;
        </button>
      </li>
      `;
    }).join('');
    const todosEl = document.querySelector('.todos');
    todosEl.innerHTML = html;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector('.status');
    if( !message ) {
      statusEl.innerText = '';
      return;
    }
    const key = message?.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }

})();
