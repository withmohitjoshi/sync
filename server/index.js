const { createServer } = require("node:http");
const { Server } = require("socket.io");
require("dotenv").config();

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Client connected successfully with socket id:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(3001, () => {
  console.log(`server running at ${process.env.NEXT_PUBLIC_SERVER_BASEURL}`);
});
