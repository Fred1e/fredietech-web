// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle client connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcast incoming messages to all connected clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', { id: socket.id, message: msg });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
