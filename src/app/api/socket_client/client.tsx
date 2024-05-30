'use client'
import React, { useEffect, useRef } from 'react';
import { io,Socket } from 'socket.io-client';

interface SocketEvents {
  connect: () => void;
  hello: (data: string) => void;
  'a user connected': () => void;
  disconnect: () => void;
}

const Chat_msg = () => {
    const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    fetch('/api/socket_server') 
      .finally(() => {
        console.log("ENterd")
        socketRef.current = io();

        socketRef.current?.on('connect', () => {
          console.log('connect');
          socketRef.current?.emit('hello');
        });

        socketRef.current?.on('hello', (data) => {
          console.log('hello', data);
        });

        socketRef.current?.on('a user connected', () => {
          console.log('a user connected');
        });

        socketRef.current?.on('disconnect', () => {
          console.log('disconnect');
        });
      });

    // Cleanup function (optional for cleanup tasks on unmount)
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return <h1>Socket.io</h1>;
};

export default Chat_msg;
