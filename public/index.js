// index.js
$(document).ready(() => {
  const socket = io.connect();

  // keep track of the current user
  let currentUser;
  // get the online users from the server
  socket.emit('get online users');

  $('#create-user-btn').click((e) => {
    e.preventDefault();
    if ($('#username-input').val().length > 0) {
      //Emit to the server the new user
      socket.emit('new user', $('#username-input').val());
      // Save the current user when created
      currentUser = $('#username-input').val();
      $('.username-form').remove();
      $('.main-container').css('display', 'flex');
    };
  });

  $('#send-chat-btn').click((e) => {
    e.preventDefault();
    // get the message text value
    let message = $('#chat-input').val();
    // make sure it's not empty
    if (message.length > 0) {
      // emit the message with the current user to the server
      socket.emit('new message', {
        sender: currentUser,
        message: message,
      });
      $('#chat-input').val();
    }
  });

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! 👋🏼`);
    $('.users-online').append(`<div class="user-online">${username}</div>`);
  })

  //Output the new message
  socket.on('new message', (data) => {
    $('.message-container').append(`
      <div class="message">
        <p class="message-user">${data.sender}: </p>
        <p class="message-text">${data.message}</p>
      </div>
      `);
  })

  socket.on('get online users', (onlineUsers) => {
    for (username in onlineUsers) {
      $('.users-online').append(`<div class="user-online">${username}</div>`);
    }
  })

  // refresh the online user list
  socket.on('user has left', (onlineUsers) => {
    $('.users-online').empty();
    for (username in onlineUsers) {
      $('.users-online').append(`<p>${username}</p>`);
    }
  })
});