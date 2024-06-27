const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`${process.env.SITE_URL}:${process.env.SITE_PORT}`],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected successfullu with sokcte id:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.SERVER_PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
