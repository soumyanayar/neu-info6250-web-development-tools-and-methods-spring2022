const chatWeb = {
  chatPage: function (chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/styles.css"/>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return (
      `<ol class="messages">` +
      Object.values(chat.messages)
        .map(
          (message) => `
      <li>
        <div class="message">
          <span class="sender">${message.sender}</span>
          <p class="message-text">${message.text} </p>
        </div>
      </li>
    `
        )
        .join("") +
      `</ol>`
    );
  },
  getUserList: function (chat) {
    return (
      `<ul class="users">` +
      Object.values(chat.users)
        .map(
          (user) => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `
        )
        .join("") +
      `</ul>`
    );
  },
  getOutgoing: function () {
    return `
      <div class="send-div">
        <form action="/chat" method="POST">
          <input name="username"  value="Amit" type="hidden" >
          <input name="text" value="" placeholder="Enter Your Message"/>    
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  },
};
module.exports = chatWeb;
