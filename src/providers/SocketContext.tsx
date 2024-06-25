"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isSocketConnect = useRef(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!isSocketConnect.current) {
      const connection = io();
      setSocket(connection as unknown as Socket);
      isSocketConnect.current = true;

      connection?.on("connect", () => {
        console.log("Socket Connected successfull");
      });

      connection?.on("disconnect", () => {
        console.log("Socket Disconnected successfull");
      });

      connection?.on("connect_error", () => {
        console.log("Socket got some error while connecting");
      });
    }
    return () => {
      setSocket(null);
      socket?.disconnect();
      socket?.removeAllListeners();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
