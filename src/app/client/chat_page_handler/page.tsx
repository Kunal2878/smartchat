
"use client"
import { useEffect, useState } from 'react';
import { io,Socket } from 'socket.io-client';
import {Message, Namespace } from '../../types/basic_types';
const Chat_msg = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const socket = io('http://localhost:5000'); 


  useEffect(() => {
        socket.on('connect', () => {
    
    });
      socket.on('chat_message', (message: Message) => {
      console.log(message.content)
      
setMessages((prevMessages) => [...prevMessages, message]);
  });
  }, []);



  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const message: Message = {
        content: messageInput,
        // author: 'Your Name', // Replace with actual author information
        // timestamp: new Date(),
      };
      socket.emit('chat_message', message);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div className='text-white'>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.content}</li>
          ))}
        </ul>
 
      </div>
      <div>
        <input
        className='text-black'
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat_msg;
