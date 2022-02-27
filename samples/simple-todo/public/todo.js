"use strict";
(function () {

  // Holding our state in variables, use this to rerender the list when needed

  const todos = [
    {
      text: 'Sleep',
      done: false,
    },
    {
      text: 'Eat',
      done: false,
    },
    {
      text: 'Knock things off shelves',
      done: true,
    },
  ];

  // We use these elements a few places, so grab them once
  // This is safe because we never replace these elements
  const listEl = document.querySelector('#todo-app .todos');
  const inputEl = document.querySelector('#todo-app input');
  const buttonEl = document.querySelector('#todo-app button');

  // These setup functions are just to make this easier to read
  disableButtonIfNoInput();
  addAbilityToCompleteItems();
  addAbilityToAddItems();
  addAbilityToDeleteItems();

  render(todos); // initial render on page load

  ///////////////////////////////////
  // This render() function takes the state and updates the HTML
  // Notice it does not add/remove elements that have listeners on them
  // That keeps the logic more simple - we put the listeners outside the area that will change
  //////////////////////////////////
  function render( todos ) {
    // Just like in our server-generated HTML, we'll build up a string of HTML text
    const html = todos.map( (todo, index) => {
      // include "complete" only if todo.done is true
      // set the data-index attribute to the index of the array
      // use data-index when modifying an item (instead of reading state from the DOM)
      const complete = todo.done ? "complete" : "";
      return `
        <li>
          <span class="todo ${complete}" data-index="${index}">${todo.text}</span>
          <span class="delete" data-index="${index}">X</span>
        </li>
      `;

    }).join('');

    // push the html we just generated into the DOM
    // replacing the previous list contents
    listEl.innerHTML = html;

    // set initial disable for button after render
    buttonEl.disabled = !inputEl.value;
  };


  ////////////////////////////
  // These setup functions run just once on page load
  // to create the listener
  ///////////////////////////
  function disableButtonIfNoInput() {
    // Disable button if no text in input field
    inputEl.addEventListener('input', () => {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addAbilityToCompleteItems() {
    // Add one listener to ul
    // click events will propagate up to it

    listEl.addEventListener('click', (e) => {
      // "if" is to make sure we don't trigger on clicks on the li elements
      if(!e.target.classList.contains('todo')) {
        return;
      }

      // find out what piece of state data we are looking at
      const index = e.target.dataset.index; // read data-index from the element
      // Flip the state
      // Notice we are toggling the state rather than the class in the DOM
      todos[index].done = !todos[index].done;

      // Now we trigger a new render with our updated state:

      render(todos);
    });
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      // Add new item to state
      const newTodo = {
        text: inputEl.value,
        done: false,
      };
      todos.push(newTodo);
      // clear the input
      inputEl.value = '';
      // update the HTML
      render(todos);
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => {
      // This could be done in the other listEl click handler
      // Here it is separate so the logic is less complex

      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index; // read data-index from the element
      todos.splice(index, 1); // remove the indicated element from list
      render(todos);
    });
  }

})();
