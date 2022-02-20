# JS DOM

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-dom' (`git checkout -b js-dom`)
* modify the files in this directory to have the require features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  
* Due by Sun Mar 6 11:59pm (PT) 

## Goals and Requirements

NOTE: You will benefit **heavily** from studying the `simple-todo` in `samples/` for this project.  Remember that client-side JS is in the `public/` directory.

You will write a page that lists items in a store inventory.
- Each item will have a name and a quantity (shown as text)
- Each item will have a "-" button to the left of the quantity, and a "+" button to the right of the quantity.
  - Pressing "+" will increase the quantity by 1
  - Pressing "-" will decrease the quantity by 1
  - The "-" button will be disabled if the quantity is 0 (you cannot go negative in quantity)
    - Hint: set `.disabled` = true on the node to disable, = false to enable
  - Hint: Do not add an event listener on every single list item
    - Place one event listener on the ancestor `<ol>` or `<ul>` element
    - read a dataset value from the target of the event (or related node) to know which element to modify

- Each item name will have an "X" button next to it.
  - Pressing X will delete the item from the list
- There is a text field and an "Add" button
  - If the text field is empty, the "Add" button is disabled
  - If the text field is populated, the "Add" button is enabled
  - Clicking the add button will add an item to the list with the text as the name and quantity 0
    - The text field will be set to empty when an item is added
  - Hint: Add the element by:
    - creating the new `<li>` element
    - setting the `.innerHTML` of the element to hold any complex HTML
    - setting any .dataset values needed
    - appending that node to the parent node

## Structure
- This page will be served by a static express server you write (static HTML, static CSS, static client-side JS)
- There will be no server-side JS other than to write the server to serve static pages
  - all "saving" of the data is in the client-side JS only, and is lost if the page reloads
- Your code can be used by running `npm install`, `node server.js`, and going to `http://localhost:3000/`
- browserify is optional for this assignment
  - if you use browserify, make sure your unbundled code is included for review

## Logic
- Do NOT use the DOM to store state (use an object to hold the inventory and render the view from that state object whenever it updates)
  - You may use "data-(whatever)" values to store indexes, ids, or other ways to connect the elements to their data sources
- Use an IIFE and do not pollute the global scope
- Achieve any visual differences from adding/removing classes
  - Do NOT add "style" attributes
  - disabling/enabling a button is not a visual difference, so that is not done via a class change
- The page should only reload if the user themselves does it, not because of your code

## Visuals
- Make your application reasonably attractive
- Include enough space around items
- Have elements reasonably aligned
- Make it clear which buttons apply to which items
  - hint: having the background color of the row the mouse is over change can make it clear which buttons apply to that row

## Additional Requirements
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Make sure your .js file(s) are clear and organized, not just a jumble of code
- Follow any suggestions previously given to you in code reviews
- Do NOT use Set() or Map() - just use a plain JS object
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage
- Do NOT interact with the browser url, including hash fragment
- Do NOT include files in your PR that are outside the assignment (no IDE configs, node_modules/, etc)
* Do not use external JS other than express itself
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily
