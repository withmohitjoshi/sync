const { createServer } = require("node:http");
const { Server } = require("socket.io");
require("dotenv").config();

const port = process.env.PORT || 3001;

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Client connected successfully with socket id:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`server running at ${port}`);
});
