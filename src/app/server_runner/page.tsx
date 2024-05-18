import Chat_msg from "../client/chat_page_handler/page"
import {Message,Namespace } from '../types/basic_types';
import {Database } from '../types/database.types';
import { createServer } from "http";
import { Server } from "socket.io";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Chat_server()
{

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
  const io = new Server(httpServer, {
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
 
   httpServer.listen(5000,()=>{
    console.log("Server running")
  });
  return (
    <div className="w-full h-full">
    <Chat_msg/>
    </div>
    );

}

