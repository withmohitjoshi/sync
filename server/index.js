const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
require("dotenv").config();

const port = process.env.SERVER_PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.MODE === 'DEV' ? `${process.env.SITE_URL}:${process.env.SITE_PORT}` : `${process.env.SITE_URL}`],
  },
});

app.get("/", (_, res) => {
  res.json({
    msg: "Hello world",
  });
});

io.on("connection", (socket) => {
  console.log("Client connected successfully with socket id:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});
