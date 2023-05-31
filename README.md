###  socketio-chat


Socket.IO is a library that enables low-latency, 
bidirectional and event-based communication between a client and a server. 
It is built on top of the WebSocket protocol and provides additional guarantees 
like fallback to HTTP long-polling or automatic reconnection.

The main idea behind Socket.IO is that you can send and receive any events you want, 
with any data you want. Any objects that can be encoded as JSON will do, 
and binary data is supported too.




Server-side code (index.js):

The server-side code sets up a web server using the Express.js framework to handle incoming requests.
It serves static files (HTML, CSS, etc.) from the 'public' directory.
It listens for socket connections using Socket.IO.
It defines event handlers for various socket events such as 'connection', 'chat message', 'set nickname', and 'disconnect'.
The server-side code receives messages from clients and broadcasts them to all connected clients using socket.emit and io.emit.


Client-side code (script.js):

The client-side code (public/script.js):
Is executed in the browser and establishes a socket connection with the server using Socket.IO.
It handles user interactions and emits socket events to the server based on those interactions (e.g., sending chat messages, setting the nickname, detecting typing).
It listens for socket events from the server and updates the user interface accordingly (e.g., displaying received chat messages, showing user connections/disconnections, showing typing notifications).
The server-side and client-side code work together to create a real-time chat application. The server facilitates communication between connected clients, receives and broadcasts messages, and manages client connections. The client-side code handles user interactions and updates the UI based on events received from the server.

By having both server-side and client-side code, you can create a fully functional real-time chat application where multiple clients can connect, send messages, receive messages, and see real-time updates of other clients' actions such as connecting, disconnecting, and typing.


## How to launch
```
Install: npm i 

Launch: node index.js
    
Use: http://localhost:3000
```