# REST SPA

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-rest-spa' (`git checkout -b js-rest-spa`)
* modify the files in this directory to have the require features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  
* Due by **Sun Mar 27 11:59pm (PT)**

## Goals and Requirements

You will be writing a static HTML page that uses client-side JS fetch calls to REST-based services (that you also write) to allow login/logout and track per-user data.

Key features will be:
- The page is a static HTML page 
- You should use babel and webpack
  - you should have appropriate separation of concerns with your client-side code, using imports and exports
  - use webpack/babel to create the static JS file the static HTML file loads
- When the page loads, the client-side JS will make a fetch call to see if the user is already logged in.
  - Hint: anything in your client-side JS will 
  - If the user is logged in, they will see a logout form button, as well as the Inventory form below
  - If the user is not logged in, they will see a login form
  - Hint: have your JS replace HTML contents to be the login form or logout form
    - Do NOT modify the `style` attribute of any elements
    - For this assignment, replace the HTML, don't just hide what is there
- Login/Logout will make a service call with fetch()
  - Do NOT perform a page load (no redirects)
  - These actions should adjust the page content to show the now-appropriate response
  - hint: Don't forget to set the content-type, or else the server will not be able to populate the request body using express.json()
- Login will show an error message to the user if the login fails (such as username dog)
  - This should be based on the response from the service, but NOT the exact response from the service
- If a logout is attempted but there is no matching current session id or session, proceed without reporting an error to the user
  - If they aren't logged in (according to the system) and are trying to "logout", they have no fix to make and are already in the "safe" state (logged out), so just permit them to think they have logged out successfully.
  - You can simulate this by logging a user in, then restarting the server (removing the session from the server but leaving the cookie in the browser)
- Inventory Form will show a number and allow it to change
  - The number is per user (Example: Bao and Amit both start at 5.  Bao changes her number to 4.  Amit still sees 5.
  - When a user logs in for the first time (the server has no stored value for that username), create a record for them with the value set to 8.
  - The number will show however the user has changed it until the server is restarted (wiping out the server-state), even if the user logs out and back in.
  - There are buttons to increase and decrease the count
    - Pressing the increase button will call a RESTful webservice to change the value by one higher than it is
      - You will write the service (Hint: use the correct HTTP method)
      - For this assignment, have the fetch call include the number being set (example: if the number is at 5, the increase button will tell the service to set it 6, as opposed to telling the server to add 1)
    - Pressing the decrease button will call the same RESTful service to change the value to one lower than it is.
      - The service will respond with a 400 error if the count is beign set to an invalid value (such as a negative number or a non-number)
    - The UI will show the decrease button as disabled when the count is at 0
      - Hint: render the HTML with the `disabled` attribute in it.  Remember that the disabled attribute should not be given a value, it should either be present in the HTML or not.
## Implementation Requirements

- There should only be one single full page load for the site
  - even if a user logs in, then logs out, then logs in again
- You should check the username for permissible values ("dog" should be rejected, and characters should be allowlisted)
  - You can pick what is permissible in a username, as long as you are allowlisting to prevent injection attacks
- The service(s) to increase/decrease number should validate that the new value is a number and return an error if it is not
  - the front end does not need to handle THAT error with a specific message, since the front end should not receive that error, but it should display at least a generic error message if it does happen
- Errors on failed login attempts should be shown to the user
- Errors should send error-codes from the service, but be shown as friendly messages to the user
- All service calls should follow the 3 RESTful rules given in class
- All service data in request/response bodies should be sent as JSON

## Structure
- This page will be served by a express server you write (a single static HTML page, static CSS, static client-side JS, and REST endpoints)
- There will be no HTML on the server or generated by server-side JS except for the single static HTML page  
- All other HTML will be built via the client-side JS
- All service endpoints will use RESTful URLs
- All service endpoints will use RESTful HTTP methods
- All service endpoints will use HTTP Status codes in a RESTful manner
- All services will return data in JSON (if they return data outside of status code)
- All services that return JSON data should have the `content-type` header of `application/json` (hint: res.json() does this for you)
- All server-side model logic should be in a separate file from your server file
- Manually reloading the page will refresh the page but show if the user is logged in or not
- Your code must be runnable with `npm install`, `npm start`, then going to `http://localhost:3000/`
  - Hint: Make sure webpack/babel builds the code to run with the `npm start` script, which you will have to add to your package.json

## Visuals
- Include enough space around items
- Have elements reasonably aligned

## Additional Requirements
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Make sure your .js file is clear and organized, not just a jumble of code
- Follow any suggestions previously given to you in code reviews
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT interact with the browser url, including hash fragment
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
* Do not use external JS other than express, cookie-parser, and uuid
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily

