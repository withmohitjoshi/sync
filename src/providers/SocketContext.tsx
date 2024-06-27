'use client';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({
  children,
  uri,
}: Readonly<{
  children: React.ReactNode;
  uri: string;
}>) => {
  console.log();
  const isSocketConnect = useRef(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!isSocketConnect.current) {
      const connection = io(uri, {
        reconnectionAttempts: 9999,
        transports: ['websocket'],
      });

      setSocket(connection as unknown as Socket);
      isSocketConnect.current = true;

      connection?.on('connect', () => {
        console.log('Socket Connected successfull');
      });

      connection?.emit('msg', {
        msg: 'Mohit',
      });

      connection?.on('disconnect', () => {
        console.log('Socket Disconnected successfull');
      });

      connection?.on('connect_error', async () => {
        console.log('Socket got some error while connecting');
      });

      connection.connect();
    }
    return () => {
      setSocket(null);
      socket?.disconnect();
      socket?.removeAllListeners();
    };
  }, [socket, uri]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
