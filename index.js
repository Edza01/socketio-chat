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

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', { nickname: socket.nickname, msg: msg });
  });

  socket.on('set nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('user connected', { nickname: socket.nickname });
  });

  socket.on('disconnect', () => {
    io.emit('user disconnected', { nickname: socket.nickname });
  });
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


