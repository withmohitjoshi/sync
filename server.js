import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'live-sync';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected to Socket', socket.id);
  });

  httpServer
    .listen(port, () => {
      console.log(`hostname:${port}`);
    })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    });
});
