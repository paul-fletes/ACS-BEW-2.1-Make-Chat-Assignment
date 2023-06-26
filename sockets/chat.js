module.exports = (io, socket) => {
  // listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    // send username to all clients connected
    io.emit("new user", username);
  })
  // listen for "new message" socket emits
  socket.on('new message', (data) => {
    // send data back to all clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`);
    io.emit('new message', data);
  })
};