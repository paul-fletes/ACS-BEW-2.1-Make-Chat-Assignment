module.exports = (io, socket) => {
  // listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    // send username to all clients connected
    io.emit("new user", username);
  })
};