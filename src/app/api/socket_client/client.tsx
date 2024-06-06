'use client'
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import  {UseAppContext}  from '../../index'
import { Database } from '../../types/database.types'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Message,Message2 } from '../../types/basic_types';
const Chat_msg = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [prevRoom, setPrevRoom] = useState<string | null|undefined>(null);
  const context = UseAppContext();
const { email,room,rmsg,setRmsg,setRoom } = context || {};
  // Replace with your Pusher credentials (store securely)
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  });


// join in a room or channel

setRoom?.('chat')

  useEffect(() => {
    console.log('useEffect')
    const channel = pusher.subscribe(`${room}`);
    channel.bind('new-message', (data: any) => {
      console.log(data)
      setMessages(prevMessages => [...prevMessages, data.mesg.content]);
    });

    return () => channel.unsubscribe();
  }, [room]);



 
  
  // Function to format timestamp in ISO 8601 format (sortable)
  function getFormattedDateTimeIso() {
    const date = new Date();
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }
  

  const sendMessage = async () => {
    const mesg: Message = {
      content: message,
      mail: email || "",
      room_name:room || '' ,
      time:getFormattedDateTimeIso()
    };
    try {
      const response = await fetch('https://pusher-chat-five.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mesg ),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('Message sent:', data.message);
      setMessage(''); // Clear message input after sending
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Enter your message..."
      />
      <button onClick={sendMessage} disabled={!message}>
        Send Message
      </button>
    </div>
  );
};

export default Chat_msg;


