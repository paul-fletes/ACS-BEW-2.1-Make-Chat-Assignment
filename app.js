//App.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io has to use the http server
const io = require('socket.io')(server);
let onlineUsers = {};
//Save the channels in this object
let channels = { "General": [] };
io.on("connection", (socket) => {
  // This file gets read on every new socket connection
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});

//Express View Engine for Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Establish your public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.handlebars');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});