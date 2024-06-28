const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.MODE === 'DEV' ? `${process.env.SITE_URL}:${process.env.SITE_PORT}` : `${process.env.SITE_URL}`],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected successfully with sokcte id:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.SERVER_PORT;

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
