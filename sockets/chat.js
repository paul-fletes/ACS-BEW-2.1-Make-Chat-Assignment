module.exports = (io, socket, onlineUsers, channels) => {
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
    // save the new message to the channel
    channels[data.channel].push({ sender: data.sender, message: data.message });
    // emit only to sockets that are in that channel room.
    io.to(data.channel).emit('new message', data);
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

  socket.on('new channel', (newChannel) => {
    console.log(newChannel);
  });

  socket.on('new channel', (newChannel) => {
    //save the channel to our channels object. The array will hold the messages.
    channels[newChannel] = [];
    //have the socket join the new channel room
    socket.join(newChannel);
    //inform all clients of the new channel
    io.emit('new channel', newChannel);
    //emit to the client that made the new channel, to change their channel to the one they made.
    socket.emit('user changed channel', {
      channel: newChannel,
      messages: channels[newChannel]
    });
  });
};