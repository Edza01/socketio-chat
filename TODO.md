## Homework

--------


###  Here are some ideas to improve the application:


```
- [x] Broadcast a message to connected users when someone connects or disconnects.

- [x] Add support for nicknames.

- [x] Don’t send the same message to the user that sent it. Instead, append the message directly as soon as they press enter.

- [x] Add “{user} is typing” functionality.

- [ ] Show who’s online.

- [ ] Add private messaging.

- [ ] Add edit sent message.

- [ ] Add console log connected user ip and browser information.

- [ ] Add log in, log out.
```



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


let reloadData = window.performance.getEntriesByType("navigation")[0].type;


  socket.on('user connected', function (data) 
  {
    const { nickname, onlineUsers } = data;

    if (reloadData != 'reload')
    {
      var item = document.createElement('li');
      item.textContent = `${nickname} connected`;
      messages.appendChild(item);
    }
    
    updateOnlineUsers(onlineUsers);
    window.scrollTo(0, document.body.scrollHeight);
  });