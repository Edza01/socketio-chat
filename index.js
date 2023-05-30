const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const { disconnect } = require('process');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

io.on('connection', (socket) => {

  console.log('a user connected');
  

  socket.on('chat message', (msg) => {
    io.emit('chat message', { nickname: socket.nickname, msg: msg });
  });

  socket.on('set nickname', (nickname) => {
    socket.nickname = nickname;
    console.log('User with nickname connected:', socket.nickname); 
    io.emit('user connected', { nickname: socket.nickname });
  });

  socket.on('disconnect', () => {
    io.emit('user disconnected', { nickname: socket.nickname });
  });





  // new
 
  socket.on('is typing', () => {
    // Broadcasting To all connected clients except the sender - broadcast
    socket.broadcast.emit('is typing', { nickname: socket.nickname });
  });
  // new



});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


