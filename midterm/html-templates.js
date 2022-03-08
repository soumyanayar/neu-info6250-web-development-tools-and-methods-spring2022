const loginPage = () => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/word-guess.css">
        <title>Login Word Guessing Game</title>
      </head>
      <body>
        <div class="login-container">
          <div id="content" class="content-container">
            <form action="/login" method="POST"> 
              <div class="page-title">
                <h2>Word Guessing Game</h2>
              </div>
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
    <button type="submit">Login</button>
    </form>
  `;
};

module.exports = { loginPage, invalidUserNameHtml };
