module.exports = (io, socket, onlineUsers) => {
  // listen for "new user" socket emits
  socket.on('new user', (username) => {
    // save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    // save username to socket as well.
    socket["username"] = username;
    console.log(`${username} has joined the chat! ✋`);
    io.emit("new user", username);
  })

  // listen for "new message" socket emits
  socket.on('new message', (data) => {
    // send data back to all clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`);
    io.emit('new message', data);
  })

  socket.on('get online users', () => {
    // send over the onlineUsers
    socket.emit('get online users', onlineUsers);
  })

  // listen for "disconnect" socket emits
  socket.on('disconnect', () => {
    // delete username from onlineUsers
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers);
  })
};