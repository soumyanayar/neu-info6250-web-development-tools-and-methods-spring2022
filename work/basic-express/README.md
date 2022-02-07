# Basic Express

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-express' (`git checkout -b basic-express`)
* modify the files in this directory to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s)  
* Due by **Sun Feb 13, 11:59pm PT**

## Goal and Requirements

The Chat application will work to show all messages, and add messages from a single user

* `http://localhost:3000/` will DYNAMICALLY return the html for the page
* The CSS will be loaded as a STATIC asset (hint: you'll have to provide the static file AND make sure it is loaded by the HTML)
* The CSS should be attractive and useful.  The visuals should make it easy to use.
* The HTML will display all of the messages that have been sent, including new ones.
* The HTML will contain a form to submit as POST(method) to `/chat` (action)
  * The form will contain a hidden field with the username.  Hardcode this to username of your choice.
  * The form will contain a field with the message.
* The server-side JS will handle this request ( fill in the `app.post()` from the included code)
  * It will add the new message to the array of messages
  * It will redirect to `/` (See included code, watch what happens in your network tab in the browser)
* It should follow the best practices outlined in class
* I should be able to run your code with `npm install` and then `node server.js`

### Special Requirements
* Create a package.json file that lists `express` as a dependency.  (Hint: remember how we created one and added a dependency in class)
* Add `package-lock.json` to your .gitignore file at the root of the repo if it isn't there already

## Allowances
* You may modify the generated HTML as you see fit
    * But it must be fundamentally semantically valid and other best practices from class
* You may modify the CSS as you see fit
    * But you must follow the best practices given in class
    * Using/extending your CSS from assignments/classes is allowed and encouraged
* The `name` form fields attributes must be:
    * `username` for the username
    * `text` for the new message text
* You must use the correct HTTP methods (GET for loading pages, POST for adding content) as listed
* You must use the route paths as given/described
    * /
    * /chat
* You may add additional JS files (server-side ONLY) that you write
    * But they must maintain/extend the existing separation of concerns
* Formatting dates and times is a nightmare in any language, so you do not HAVE to format your timestamps  

## Restrictions
* DO NOT HAVE ANY "PASSWORD" behavior
    * Poor security is BAD security - we will not even pretend to have security yet
* Do NOT add extra routes beyond those described above
* Do NOT change how the routes get/pass data except as described here
* Do NOT use external JS other than express itself
    * This means no client-side (browser) JS.  Only server-side.
* Do NOT use external CSS libraries
* Do NOT use meta-tag redirects
* You may NOT use floats to do more than manage flowing text with images
* You may NOT use HTML tables or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* You may NOT use CSS preprocessors, minifiers, or other tools to modify your CSS
  * Reviewers must be able to read your work easily

