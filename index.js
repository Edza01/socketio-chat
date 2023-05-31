const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Create an empty array to store online users
const onlineUsers = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('set nickname', (nickname) => {
    socket.nickname = nickname;
    onlineUsers.push(nickname);
    console.log('User with nickname connected:', socket.nickname);
    io.emit('user connected', { nickname: socket.nickname, onlineUsers });

    // Emit the updated list of online users to the current client
    socket.emit('update online users', onlineUsers);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { nickname: socket.nickname, msg: msg });
  });

  socket.on('disconnect', () => {
    if (socket.nickname) {
      onlineUsers.splice(onlineUsers.indexOf(socket.nickname), 1);
      io.emit('user disconnected', { nickname: socket.nickname, onlineUsers });
    }
  });

  socket.on('is typing', () => {
    socket.broadcast.emit('is typing', { nickname: socket.nickname });
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
