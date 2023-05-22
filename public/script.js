(function () {
  var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function (data) {
    var { nickname, msg } = data;
    var item = document.createElement('li');
    item.textContent = `${nickname}: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  const getNickname = () => {
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      return storedNickname;
    } else {
      const nickname = prompt('Please enter your nickname:');
      localStorage.setItem('nickname', nickname);
      return nickname;
    }
  };

  const handleUserNickname = (nickname) => {
    const item = document.createElement('li');
    item.textContent = `Your nickname: ${nickname}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const nickname = getNickname();
  handleUserNickname(nickname);

  socket.emit('set nickname', nickname);

  socket.on('user connected', function (data) {
    const { nickname } = data;
    const item = document.createElement('li');
    item.textContent = `${nickname} connected`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('user disconnected', function (data) {
    const { nickname } = data;
    const item = document.createElement('li');
    item.textContent = `${nickname} disconnected`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });







 
// function timeoutFunction() {



})();
