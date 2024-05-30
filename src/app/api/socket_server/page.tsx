
import {Message,Namespace } from '../../types/basic_types';
import {Database } from '../../types/database.types';
import { createServer } from "http";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Server, ServerOptions } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import Chat_msg from "../socket_client/client"
// export   async function Handler() {

//   // if (!res.socket?.server.io) {
//     console.log('*First use, starting socket.io');

//     // const io = new Server<ServerOptions>(res.socket.server); // Allow options
//     const io = new Server({
//       cors:{
//        origin:'*',
//        methods:['GET', 'POST']
//       }
     
//        });
//     io.on('connection', (socket) => {
//       socket.broadcast.emit('a user connected');
//       socket.on('hello', (msg: string) => {
//         socket.emit('hello', 'world!');
//       });
//     });

//     // res.socket.server.io = io;
//   // } else {
//   //   console.log('socket.io already running');
//   // }

//   // res.end();


// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };
//   }
  export default function Show_chat(){
    // const h= Handler();
  return(
    <div className='w-full '> <Chat_msg/></div>
  )
}