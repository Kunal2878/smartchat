import Chat_msg from "../client/chat_page_handler/page"
import {Message,Namespace } from '../types/basic_types';
import {Database } from '../types/database.types';
import { createServer } from "http";
import { Server } from "socket.io";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from "next";
export default async function Chat_server(req: NextApiRequest, res: NextApiResponse)
{
console.log("Chat Server is running");
  const supabase = createServerComponentClient<Database>(
    { cookies },

    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();
  var sessionCheck = false;
  var email = session?.user.email;

  const httpServer = createServer();
  const io = new Server({
 cors:{
  origin:'*',
  methods:['GET', 'POST']
 }

  });

  const recentlyBroadcastMessages = new Set();

  io.on("connection", (socket) => {
    io.on("connection", (socket) => {
      console.log("Socket ID:", socket.id, "connected");
      socket.on("disconnect", () => {
        console.log("Socket ID:", socket.id, "disconnected");
      });
    });
    
    socket.on("join_room", (roomName,email) => {
      console.log("room_name",roomName)
      socket.join(roomName);
      
     
    })
    socket.on("leave_room", (roomName) => {

    });
    socket.on("chat_message", async (message: Message) => {
      try {
        if (!recentlyBroadcastMessages.has(message.content)) {
          recentlyBroadcastMessages.add(message.content);
          console.log("message content",message.content)
          if(message.room_name){
            io.to(message.room_name).emit("chat_message", message);

         
       

        }
          else {
            console.warn('Message received without room information, cannot broadcast.');
          }
        }


      } catch (error) {
        console.error('Error sending message to Supabase:', error);
      
      }
    });
    

  });
 
  //  httpServer.listen(5000,()=>{
  //   console.log("Server running")
  // });
  
  return (
    <div className="w-full h-full">
    <Chat_msg/>
    </div>
    );

}

// import { Server } from "socket.io";

// const io = new Server();

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// export default io;

// Create an endpoint in the Next.js backend:
// import { NextApiRequest, NextApiResponse } from "next";
// import io from "./socket.js";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Initialize the Socket.IO connection
//   io.init(req, res);

//   // Handle the Socket.IO events
//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
//   });
// }

// Make a request to the endpoint in the client to initialize the socket connection:

// import io from "socket.io-client";

// const socket = io();

// socket.on("connect", () => {
//   console.log("Connected to the server");
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from the server");
// });


// Implement a component with an input field in the index.js file:
// import React, { useState } from "react";
// import io from "socket.io-client";

// const socket = io();

// const IndexPage = () => {
//   const [message, setMessage] = useState("");

//   const handleChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleSubmit = () => {
//     socket.emit("message", message);
//     setMessage("");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={message}
//         onChange={handleChange}
//       />
//       <button onClick={handleSubmit}>Send</button>
//     </div>
//   );
// };

// export default IndexPage;