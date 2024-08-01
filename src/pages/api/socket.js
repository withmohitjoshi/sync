import { Server } from "socket.io";

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("User connected to socket id:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected from socket id:", socket.id);
      });

    });

    res.socket.server.io = io;
  }
  res.end();
}
