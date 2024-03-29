import Chat_msg from "../client/chat_page_handler/page"
import {Message,Namespace } from '../types/basic_types';
import {Database } from '../types/database.types';
import { createServer } from "http";
import { Server } from "socket.io";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid';
export default async function Chat_server()
{

  const supabaseUrl = 'https://igscvhkqnkryacanuwqb.supabase.co'

  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE' ;
  const supabase = createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey: supabaseAnonKey
  });

  const httpServer = createServer();
  const io = new Server(httpServer, {
 cors:{
  origin:'*',
  methods:['GET', 'POST']
 }

  });
  const recentlyBroadcastMessages = new Set();
  
  io.on("connection", (socket) => {
 
    socket.on("chat_message", async (message: Message) => {
      try {
        if (!recentlyBroadcastMessages.has(message.content)) {
          recentlyBroadcastMessages.add(message.content);
          io.emit("chat_message", message);
          console.log("Received message:", message.content);
    
          const newUUID = uuidv4();

const { data, error } = await supabase
.from('Chat_room')
.insert([
  { id:newUUID,room_name: 'someValue', info: {name:'otherValue',

content:message.content}, Isfriend:false },
])
.select()
console.log("Data",data, "error:", error)

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
    <Chat_msg />
    );

}

