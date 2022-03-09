const words = require("./words.js");

const loginPage = () => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Login Word Guessing Game</title>
      </head>
      <body>
        <div class="login-container">
          <div id="content" class="content-container">
            <form action="/login" method="POST"> 
                <h1>Word Guessing Game</h1>    
              <div class="text-input" id="login_username">
                <input name="username" placeholder="Enter your username" required> 
                <div class="space">
                  <button class="login-button" type="submit">LOGIN</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
    `;
};

const invalidUserNameHtml = (errorMessage) => {
  return `
    <link rel="stylesheet" href="/style.css" />
    <h2>${errorMessage}</h2>
    <h3>Please Login Again..!!</h3>
    <form method="GET" action="/">
    <button class="login-button" type="submit">Login</button>
    </form>
  `;
};

const homePage = (user) => {
  return `
  <!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
      <title>Word Guessing Game</title>
    </head>
    <body>
      <div id="word-guessing-game">
        <div class="page-title">
            <h2>Word Guessing Game, Welcome ${user.username} </h2>
            <div class="logout"> 
              <form action="/logout" method="POST"> 
                <button class="logout-button" type="submit">LOGOUT</button>
              </form>
            </div>
        </div>
        <div class="game-panel">
        <div class="game-panel-container">
          <div class="control-panel">
            <div class="word-input">
              <form action="/guess" method="POST"> 
                <input name="guessedWord" placeholder="Type your guess" required ${
                  user.game.isGameWon ? "disabled" : "enabled"
                }> 
                <button class="guess-button" type="submit" ${
                  user.game.isGameWon ? "disabled" : "enabled"
                }>GUESS</button>
              </form>
              <div class="message-panel">
              ${user.game.message}
              </div> 
              <div class="controls">
              <div class="restart"> 
                <form action="/restart" method="GET"> 
                  <button class="restart-button" type="submit">RESTART</button>
                </form>
              </div>
            </div>
          </div>
        </div>
            <div class="accepted-guess-panel">
              <h3>Your Guesses & Letter Match History</h3>
              <div class="word-list">
                  ${user.game.guessedWords
                    .map(
                      (guess) =>
                        `<div><span class="word">You guessed "${guess.guessedWord}"</span> : <span class="word">matched ${guess.numberOfMatchingLetters} letters with secret word</span></div>`
                    )
                    .join("")}
              </div>
              <div class="turns">
                Number Of Accepted Guesses: ${user.game.numberOfValidGuesses}
              </div>
            </div>
          </div>
          <div class="word-list-panel">
            <h3>Secret Word List</h3>
            <div class="word-list">
              ${words
                .map((word) => `<span class="word">${word}</span>`)
                .join("")}
            </div>
          </div>
        </div> 
      </div>
    </body>
  </html>
  `;
};

module.exports = { loginPage, invalidUserNameHtml, homePage };
