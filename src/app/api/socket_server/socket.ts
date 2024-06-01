
import {Message,Namespace } from '../../types/basic_types';
import {Database } from '../../types/database.types';
import { createServer } from "http";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Server, ServerOptions } from 'socket.io';
import { NextRequest, NextResponse } from 'next/server';
import Chat_msg from "../socket_client/client"
export default async function handler(req:any,res: any) {
  console.log(res)
  // if (!res) {
    console.log('*First use, starting socket.io');

    const io = new Server( res.socket.server,{
      path: '/api/socket_server/socket',addTrailingSlash:false,
    
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT']
      }
    });
res.socket.server=io
    io.on('connection', (socket) => {
      socket.broadcast.emit('a user connected');
      socket.on('hello', (msg: string) => {
        socket.emit('hello', 'world!');
      });
    });

    // res.socket.server.io = io;
  // } else {
  //   console.log('socket.io already running');
  // }
}
//   export default function Show_chat(){
//     // const h= Handler();
//   return(
//     <div className='w-full '> <Chat_msg/></div>
//   )
// }
