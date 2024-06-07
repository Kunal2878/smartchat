'use client'
import React, { useEffect, useState,useCallback } from 'react';
import Pusher from 'pusher-js';
import  {UseAppContext}  from '../../index'
import { Database } from '../../types/database.types'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Message,Message2 } from '../../types/basic_types';
import Image from 'next/image'

const Chat_msg = () => {
  let Room_msg=[]
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [prevRoom, setPrevRoom] = useState<string | null|undefined>(null);
  
  const context = UseAppContext();
  const { email,room,rmsg,setRmsg,setRoom,setEmail } = context || {};
setRoom?.('chat')
setEmail?.('kp')
const supabase = createClientComponentClient<Database>(
  {
    supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
  }
)

  // Replace with your Pusher credentials (store securely)
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  });


// join in a room or channel

const joinRoom = useCallback(async () => {
  Room_msg=[]
  setRmsg?.([]);
  setMessages([]);
  setPrevRoom(prevRoom|| room)
  if (room) {
  
    const { data:r_data, error:r_error } = await supabase
      .from("Chat")
      .select("*")
      .eq("room", room)
      .order("time", { ascending: true })
    
    if(r_data){
console.log(r_data)
      Room_msg = r_data

      setRmsg?.(Room_msg)

    }
    else if(r_error){
    window.alert("Error in fetching data")
    }
  
  }
},[room]);

useEffect(() => {

joinRoom();
}, [room]);

  useEffect(() => {
    const channel = pusher.subscribe(`${room}`);
    channel.bind('new-message', (data: any) => {
      console.log(data)
      setMessages(prevMessages => [...prevMessages, data]);
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
    let time=getFormattedDateTimeIso()
    let mesg = {
      message: message,
      sender: email || '',
      room:room || '' ,
      time:time
    };
    try {
      const response = await fetch('https://pusher-chat-five.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({message,room,email,time}),
        body: JSON.stringify(mesg)
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
    let chat_data = {
      message: message,
      sender: email || '',
      room:room || '' ,
  
    };
    const { data, error } = await supabase.from('Chat').insert([chat_data]);

  if (error) {
    console.error('Error inserting data:', error);

  } else {
    console.log('Data inserted successfully:', data);

  }
  };


  return (
    <div className='w-full  h-screen overflow-hidden'
    
    style={{ backgroundImage: `url(/chatbg.jpg)`,backgroundPosition:"center", backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}
    
    >

<div className=' w-full  h-full flex flex-col'>

<div className='w-full flex flex-col  h-full  overflow-hidden hover:overflow-y-auto'>


{


rmsg.length>0 &&(
<div className='w-full h-full  right-0 flex flex-col mt-2 mr-2 '>
  {
    rmsg.map((itr:any,index:any)=>(
    itr.sender===email?(
      <div    key={index} className='w-full flex flex-row justify-end items-center right-0 '>
  <div
         
            className="rounded-md md:min-w-[100px] md:max-w-[3200px] min-w-[100px] max-w-[300px] p-2 mr-4 flex flex-row  items-center bg-cyan-400 mb-4 "
     
          >
            {itr.message}
          </div>
          </div>


    ):(
      <div    key={index} className='w-full flex flex-row justify-start items-center left-0 '>
      <div
            key={index}
            className="rounded-md md:min-w-[100px] md:max-w-[3200px] min-w-[100px] max-w-[300px] p-2 ml-4  bg-orange-600 mb-4 flex flex-row  items-center "
          >
            {itr.message}
          </div>
          </div>
    )
  ))
}
</div>
)

}


{
messages.length>0&&(



  <div className='w-full h-full  right-0 flex flex-col mt-2 mr-2 '>
  {
messages.map((itr:any, index) => (
itr.sender===email?(
<div   key={index} className='w-full flex flex-row justify-end items-center right-0 '>
  <div
          
            className="rounded-md md:min-w-[100px] md:max-w-[3200px] min-w-[100px] max-w-[300px] p-2 mr-4 bg-cyan-400 mb-4"
          >
            {itr.message}
          </div>
          </div>
    ):(
<div key={index} className='w-full flex flex-row justify-start items-center left-0 '>
      <div
      key={index}
            className="rounded-md md:min-w-[100px] md:max-w-[3200px] min-w-[100px] max-w-[300px] p-2 ml-4 bg-orange-600 mb-4"
          >
           {itr.message}
          </div>
          </div>
    )
          ))
        }
          </div>

)

} 
     
 
        
      </div>
      <div>




      <div className=' search w-full flex flex-row justify-center items-center  lg:h-16 mb-0 dark:bg-gray-900 bg-white '>

        <input
     className='rounded-md mr-4 dark:bg-white bg-gray-900 dark:text-red-900 text-red-400 outline-none' placeholder='Message....'
     type="text"
     value={message}
     onChange={(e) => setMessage(e.target.value)}
     />

<button className="size-12 md:size-8 flex  cursor-pointer justify-start rounded-full bg-gradient-to-r from-yellow-200 to-black disabled:cursor-not-allowed"
onClick={sendMessage} disabled={!message}
>


  <Image
    src="/send_icon.png"
    width={10}
    height={10}
    alt="Picture of the author"
    className="w-full h-full object-cover"

  />
       </button>
     </div>
      </div>
    </div>
        </div>
  );
  // return (
  //   <div className="chat-container">
  //     <h2>Chat Messages</h2>
  //     <ul>
  //       {messages.map((message, index) => (
  //         <li key={index}>{message}</li>
  //       ))}
  //     </ul>


    



  //     <input
  //       type="text"
  //       value={message}
  //       onChange={e => setMessage(e.target.value)}
  //       placeholder="Enter your message..."
  //     />
  //     <button onClick={sendMessage} disabled={!message}>
  //       Send Message
  //     </button>
  //   </div>
  // );
};

export default Chat_msg;


