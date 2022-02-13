# Express Login Assignment

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'express-login' (`git checkout -b express-login`)
* Create a package.json and necessary files to complete the work described below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s).  
* Due by Sun Feb 27 11:59pm (PT) 

## Goal and Requirements

The application will be a site that performs login, keeps information for each user, and allows a logout

- the home page of the application will show either a login form, or the data page.
- the home page offers the option to logout if the user is already logged in.
- the data page will show current "stored word" for the current logged in user
- the data page will include a form to replace the stored word with a new one
- multiple users can use the system without problems
  - each with their own separate stored word
- You should demonstrate the skills taught in this course where applicable
- You will not be using HTTPS
- You will not be using any password entry or handling

See "Requirements" below for more specific requirements

## Requirements

### Visuals

* You must show effort to make it visually attractive and usable
* All displayed and requested data must be labeled so a user can understand what they are seeing

### Logic

#### Login

- A user that is not logged in will be prompted to enter their username
- The form that collects the username should POST to a different route (path is up to you)
- The server will create a UUID-based session id and store it in a cookie.  The server will also associate that sid with the username.  (hint: have the sid be a key for an object that is defined OUTSIDE the request handler in the server.  Set the value to an object, with `username` as one of the properties in that object)
- login will fail for an empty username or the username "dog" or any username that is not made up of letters or numbers only
  - Hint: If you want to look into regular expressions, see the `/readings/js/regex` file for some base info, then checkout https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
- If login fails (bad username) you should respond with a 401 status code and a web page that informs them and offers a link to see the login form again (this can be simply a link to the home page)
- If login succeeds the server should respond with a redirect to the home page.

#### Data Page

- A user that is validly logged in will see the data page on `/`
- The data page will offer a button to logout (use POST to logout for this assignment)
- The data page will display a "stored word" specific to that user
  - the stored word is stored on the server and not sent a cookie
  - the stored word defaults to the empty string
- The data page has a form to change the stored word
  - The path of the route to change the stored word is up to you
- If a change is submitted, the server will record that change and associate it to the username and redirect to `/`
  - Hint: A second object to hold the stored words is a good idea.  Use keys of the username.  That way the data is associated with the user, not the session id. Every change attempt will make sure the session id is a valid user
  - Hint: Delete or change your session id cookie in the DevTools before submitting the change form to test this
- A user that sets a stored word, logs out, and later logs back in will still see their stored word
- stored words can be different for different users
  - Hint: Use an incognito/private browser to login in as a second user at the same time your main browser window is logged in as a first user

#### Logout

- the logout route will:
  - remove the session id from the object it is using to store the session info
    - hint `delete obj.key` removes property `key` from `obj`
  - remove the cookie from the browser
  - redirect the user to `/`
- the logout route will NOT:
  - remove the stored word from being associated with that username
  - Hint: This means the session object doesn't hold the stored word.  Try using a second object that connects the username to the stored word, just like the session object connected the sid to the username.

#### Internals

* The application must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`

## Allowances
* You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
* You may create your HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class and the Restrictions below
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You should use `express`, `cookie-parser`, and `uuid` modules only
* You must add additional JS files (server-side ONLY) that YOU write to uphold the idea of separation of concerns
* You must use the correct HTTP methods (GET for loading pages, POST for adding content)
* Reloading a page should not trigger a POST (use a redirect)
* Do not use external JS other than base express and cookie-parser
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* Do not have any files in your PR except for the exam (no files from other assignments, for example)
* Use arrays and objects when they each make sense
* Do not use Map() or Set() for this exam
  * In order to ensure you use objects and arrays correctly
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
  * The console.log to show the secret word is allowed and required
* Do not have commented out code
* Do not use client-side(browser) JS
* Do not use localStorage
* Do not use meta tag refreshes
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

