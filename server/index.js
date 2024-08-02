require("dotenv").config();
const { createServer } = require("node:http");
const dbConnect = require("./dbConfig/dbConnect");

const { Server } = require("socket.io");

let db;
const port = process.env.PORT || 3001;
const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Client connected successfully with socket id:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(port, async () => {
  db = await dbConnect();
  console.log(`server running at ${port}`);
});
