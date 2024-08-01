"use client";
import React, { createContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const SocketContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      console.log(
        "----------",
        `${process.env.NEXT_PUBLIC_SITE_BASEURL}/api/socket`
      );

      fetch(`${process.env.NEXT_PUBLIC_SITE_BASEURL}/api/socket`);
      const connection = io();

      connection.on("connect", () =>
        console.log("Socket Connected successfully")
      );

      connection.on("disconnect", () =>
        console.log("Socket Disconnected successfully")
      );

      connection.on("connect_error", async (error) => {
        console.log("Socket got some error while connecting:", { error });
      });
      socketRef.current = connection;
    }

    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners();
        socketRef.current = null;
      }
    };
  }, []);

  const socket = socketRef.current;

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
