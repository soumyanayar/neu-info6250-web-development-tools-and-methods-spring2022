# INFO6250 Midterm Project

** Due Sun Mar 13 11:59pm PT  **

## Goals

- You will build a web-based word guessing game
  - this site will use a mix of backend-generated HTML and (for extra credit) front-end validation JS
  - this will NOT be making use of REST-based services or fetch()
- You will demonstrate the skills taught in class

## Functional Requirements

### Home Page

When the User loads the page (path: `/`)
- the site will determine if the user is logged in (based on `sid` session cookie)

- If the user is not logged in:
  - the page will display a login form instead of the below content
  - the login form will ask for a username but will NOT ask for a password
  - the login form will POST to `/login` (see "The Login Flow")

- A logged in user will see:
  - A list of words the secret word could be
  - A list of any previously guessed words and how many letters each matched (see "Making a Guess")
  - A count of how many valid guesses they have made so far (essentially, a score a player wants to keep low)
  - What their most recent guess was, and how many letters it matched
    - or, if their previous guess was invalid they will be told that guess and that it was invalid
      - Hint: The front end can prevent invalid guesses, but the backend should still code for the possibility
  - If their previous guess was correct: a message saying they have won
  - If their previous guess was incorrect: an option to make another guess (see "Making a Guess")
  - An option to logout
  - An option to start a new game
  - Notice: All of the above is true even if they reload the page

### Making a Guess

A guess will be sent as a POST to the path `/guess`
- The server will check for a valid session id
  - If there is not a valid session id, the page will display a message and a login form
    - Hint: an invalid session id could come from manually changing your cookie or restarting the server (it will forget all sessions ids, but the browser will still have the sid cookie)
- The server will check for a valid guess (one of the allowed words for the secret word to be)
  - If the guess is not valid, the server will update the server state for that player and respond with a redirect to the Home Page 
  - If the guess is valid, the server will update the server state for that player and respond with a redirect to the Home Page
  - Hint: See "Home Page" for ideas on what details the server state will have to know.  If we had a database much of that information would be there, but because we do not we will simply hold the state data in different objects.  Remember to keep information for different players separate.

The guess is evaluated for how many letters match between the guess and secret word (see "Starting a New Game"), regardless of position of the letters in the word and regardless of the upper/lower case of the letters.  
- Hint: This should sound like an earlier assignment

### Starting a New Game

A new game begins when a user starts a new game or logs in for the first time.
- A secret word is picked at random from the list of available words
  - Hint: see Math.random() at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  - The list of available words is exported by the provided `words.js` file
    - `require()` this file in your JS to get the array of words.
    - You may change the words in words.js, but you should not otherwise alter the file.

If the user is starting a new game by virtue of logging in for the first time, it is done as part of login and does not require extra navigation in the browser

If the user is manually starting a new game, it is done as a POST to `/new-game`
- The server will check for a valid session id
  - If there is not a valid session id, the page will display a message and a login form
    - Hint: an invalid session id could come from manually changing your cookie or restarting the server (it will forget all sessions ids, but the browser will still have the sid cookie)
- If there is a valid session, after updating the state, the response will redirect to the Home Page.

To help with grading, the server will `console.log()` the username and the chosen secret word whenever a new game is started for a player.
- This is not a debugging console.log().  Be careful to make sure all debugging console.log() statements are removed before turning in your project

Important: No information is sent to the browser that allows someone to learn the secret word without playing the game

### The Login Flow

Login is performed as a POST to `/login`
- It will send only the username, no password
- If the username is valid the server will respond with a `sid` cookie using a uuid.
  - have an allowlist of valid characters
  - explicitly disallow username "dog" (This simulates a user with a bad password, since we aren't using passwords)
  - after setting the cookie header, respond with a redirect to the Home Page
- If the username is invalid, respond with a login form that contains a message about the username being invalid
  - Frontend JS could prevent an invalid username, but the server-side must still handle the possibility

If a username that is in the middle of a game logs in
- They will be able to resume their existing game
- Hint: This means the game info is not tied to their session id, it is tied to their username
  - Hint2: Have one object that connects sessions to usernames, and a second, separate object that connects usernames to game state

### The Logout Flow

A user logs out with a POST to `/logout`
- Even a user with no session id or an invalid session id can logout
- This will clear the session id cookie (if any)  on the browser
- This will remove the session information (if any) from the server
  - Hint `delete obj["key"]` will remove the "key" property from object "obj"
- Logout does NOT clear the game information from the server
  - The user can log in as the same username and resume the game
- After the logout process the server will respond with a redirect to the Home Page

## Visual Requirements

- The game requires some effort to visually present the data and forms
  - spacing, color, and layout of sections should make it readable and presentable as a demonstration of skill
- The game does not need to work on mobile screens, but it should look appropriate at a range of desktop sizes
- This is not a web design class, so I do not expect art.  However, even fully backend coders must be able to present their work pleasantly.

## Implementation Requirements

- Your code should follow the best-practices outlined in class
- Your work must demonstrate the skills from class.  Simply "working" is insufficient!
- The game must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`
- Multiple players must be able to play separate games (from different browsers) simultaneously
- Logout and a later login must allow you to resume a game
  - as long as the server has not restarted.  No long-term persistence is expected.
- The server-side MUST enforce security (session and field validity)
- The front-end JS should provide convenience  (See "Extra Credit")
- You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
- You may create your HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
- You may create the CSS as you see fit but you must follow the best practices given in class and obey any restrictions listed here
- You may add icons and background images but there is no requirement to do so
  - So long as any icons are done without outside JS or CSS
- You should use `express`, `cookie-parser`, and `uuid` modules only
- Do not use external JS other than the above
- You must add additional JS files (server-side ONLY) that YOU write to uphold the idea of separation of concerns
- You must use the correct HTTP methods (GET for loading pages, POST for adding content)
- Reloading a page should not trigger a POST (use a redirect)
  - Except for any listed cases with invalid sessions
- Do not use external CSS libraries
- You may not use CSS floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
- Do not have any files in your PR except for the project (no files from other assignments, for example)
- Use arrays and objects when they each make sense
- Do not use Map() or Set() for this exam
  - In order to ensure you use objects and arrays correctly
- Do not use `var`
- use `const` and `let` appropriately
- Do not use `alert`, `prompt`, or other blocking JS prompts
- Do not use poor variable and function names
- Do not have functions that are too big/do too much
- Do not have console.log messages from debugging
  - The console.log to show the secret word is allowed and required
- Do not have commented out code
  - Useful comments as discussed in class are welcome though
- Do not use localStorage, sessionStorage, or indexedDB
- Do not use meta tag refreshes
- Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

## Extra Credit

Extra credit is worth less than base features, so make sure to have the above working before putting effort into extra credit.  

Each of the following is worth an extra credit point.  

- Prevent the login form from submitting and/or disable button when there is nothing in the username field
- Prevent the guess form from submitting and/or disable button when there is nothing in the guess field
- Prevent the guess form from submitting and/or disable the button when the value in the guess field is not a acceptable guess
- Inform the user when the value in the guess field is not an acceptable guess
  - Bonus point: Do this when they attempt to submit or when the field loses focus rather than doing it as they type

## Submission Instructions

- Start from the up-to-date main branch (git checkout main; git pull origin main)
- Create a feature branch named 'midterm' (git checkout -b midterm)
- Create a package.json and necessary files to complete the work described in this README
- Add, commit, and push the branch to github
- Create a PR to merge to main
- Be sure to include the reviewer(s).
