(function () {
  var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  var onlineUsersList = document.getElementById('online-users');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  // input.addEventListener('keyup', function (e) {
  //   if (e.keyCode === 13) {
  //     if (input.value.trim() !== '') {
  //       socket.emit('chat message', input.value);
  //       input.value = '';
  //     }
  //   } else {
  //     if (input.value.trim() !== '') {
  //       socket.emit('is typing');
  //     } else {
  //       socket.emit('stop typing');
  //     }
  //   }
  // });

  socket.on('chat message', function (data) {
    var { nickname, msg } = data;
    var item = document.createElement('li');
    item.textContent = `${nickname}: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });




  var isTyping = false; // Track typing state

  // Add an event listener for the 'keyup' event to detect typing
  input.addEventListener('keyup', function () {
    if (!isTyping && input.value.trim() !== '') {
      isTyping = true;
      socket.emit('is typing'); // Emit the 'is typing' event to the server
    } else if (isTyping && input.value.trim() === '') {
      isTyping = false;
    }
  });

  // Add a socket event listener for 'is typing'
  socket.on('is typing', function (data) {
    var { nickname } = data;
    var item = document.createElement('li');
    item.textContent = `${nickname}: is typing`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });





  // socket.on('is typing', function (data) {
  //   var { nickname } = data;
  //   var item = document.createElement('li');
  //   item.textContent = `${nickname} is typing`;
  //   item.id = 'typing-message';
  //   messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  // socket.on('stop typing', function () {
  //   var typingMessage = document.getElementById('typing-message');
  //   if (typingMessage) {
  //     typingMessage.remove();
  //   }
  // });




  let reloadData = window.performance.getEntriesByType("navigation")[0].type;






  socket.on('user connected', function (data) {

    if (reloadData != 'reload')
    {
      var { nickname } = data;
      var item = document.createElement('li');
      item.textContent = `${nickname} connected`;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  socket.on('user disconnected', function (data) {

    if (reloadData != 'reload')
    {
      var { nickname } = data;
      var item = document.createElement('li');
      item.textContent = `${nickname} disconnected`;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }
    
  });

  socket.on('update online users', function (onlineUsers) {
    onlineUsersList.innerHTML = '';
    for (var i = 0; i < onlineUsers.length; i++) {
      var userItem = document.createElement('li');
      userItem.textContent = onlineUsers[i];
      onlineUsersList.appendChild(userItem);
    }
    // Save the updated online users array in local storage
    localStorage.setItem('onlineUsers', JSON.stringify(onlineUsers));
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
    var item = document.createElement('li');
    item.textContent = `Your nickname: ${nickname}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const nickname = getNickname();
  handleUserNickname(nickname);

  socket.emit('set nickname', nickname);
})();
