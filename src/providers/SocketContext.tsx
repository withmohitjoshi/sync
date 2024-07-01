'use client';
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({
  children,
  uri,
}: Readonly<{
  children: React.ReactNode;
  uri: string;
}>) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current && false) {
      const connection = io(uri, {
        reconnection: false,
        reconnectionAttempts: 5,
        transports: ['websocket'],
      });

      connection.on('connect', () => console.log('Socket Connected successfully'));

      connection.on('disconnect', () => console.log('Socket Disconnected successfully'));

      connection.on('connect_error', async (error) => console.log('Socket got some error while connecting:', { error }));

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

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
