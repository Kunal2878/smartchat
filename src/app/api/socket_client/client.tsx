'use client'
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const Chat_msg = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // Replace with your Pusher credentials (store securely)
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  });

  useEffect(() => {
    const channel = pusher.subscribe('chat-channel');
    channel.bind('new-message', (data: any) => {
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    return () => channel.unsubscribe();
  }, []);

  const sendMessage = async () => {
    try {
      const response = await fetch('https://pusher-chat-five.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
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


