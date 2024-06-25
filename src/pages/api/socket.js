import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  console.log("called api");
  if (res.socket.server.io) {
    console.log("Socket already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Socket server running");
      console.log("socket id:", socket.id);

      socket?.on("disconnect", () => {
        console.log("Socket Disconnected successfull");
      });
    });
  }
  res.end();
};

export default SocketHandler;
