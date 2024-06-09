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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedMessages, setEditedMessages] = useState<any>({});
  const [neweditedMessages, setNewEditedMessages] = useState<any>({});
  
  const [prevRoom, setPrevRoom] = useState<string | null|undefined>(null);
  
  
  const context = UseAppContext();
  const { email,room,rmsg,setRmsg,setRoom,setEmail } = context || {};
  setRoom?.("chat")
  setEmail?.('kp')
  const sty1="w-[200px]  top-0 mr-2  flex-row items-center justify-end hidden group-hover:flex pl-2"

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
        body: JSON.stringify(mesg)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('Message sent:', data.message);
      setMessage('');
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
  }
// function to delete, update and copy a message a message 
async function deleteMessage(id:any) {
setEditedMessages({ ...editedMessages, [id]:'deleted' })
const{data,error}= await supabase.from('Chat').delete().eq('id', id)
if(error){window.alert("Error in deleting, retry after sometime")}
}

function loadMessages() {
  setIsEdit(true);


}
async function updateMessage(id:any) {
// setPrevMesg(newMesg)
console.log("updated message",editedMessages[id])
setNewEditedMessages({ ...neweditedMessages, [id]: editedMessages[id] })

const{data,error}= await supabase.from('Chat').update({
  message:editedMessages[id]
  }).eq('id', id)
  if(error){window.alert("Error in updating, retry after sometime")}
  setIsEdit(false);

}


  return (

    <div className='w-full  h-screen '
    
    style={{ backgroundImage: `url(/chatbg.jpg)`,backgroundPosition:"center", backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}
    
    >

<div className=' w-full H-con overflow-hidden hover:overflow-y-auto flex flex-col 'style={{height:'calc(100vh - 60px)' }} >

<div className='w-full flex flex-col '>


{


rmsg.length>0 &&(
<div className='w-full   right-0 flex flex-col mt-2 mr-2 '>
  {
    rmsg.map((itr:any,index:any)=>(

     

    itr.sender===email?(
      <div    key={index} className={`${editedMessages[itr.id]==='deleted'?'hidden':''} w-full flex flex-col items-center right-0 mb-12`}>
      <div    className='w-full flex flex-row justify-end items-center right-0'>

      <div   className='group md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] flex flex-col mr-4 '>


      <input
      className={`rounded-md w-full min-h-[30px] max-h-auto p-2 mr-4 flex flex-row text-white items-center bg-indigo-600 focus:outline-none ${isEdit?"focus:ring-2 focus:ring-red-500":'outline-none'} `}
      
      value={editedMessages[itr.id] !== undefined ? editedMessages[itr.id] : (itr.message !== undefined ? itr.message : '')}
      onChange={(e) => setEditedMessages({ ...editedMessages, [itr.id]: e.target.value })} 
   
      disabled={!isEdit} 
      onMouseLeave={() => {  neweditedMessages[itr.id] !== editedMessages[itr.id]&&setEditedMessages({ ...editedMessages, [itr.id]:itr.message });  setIsEdit(false)}}
      // onBlur={handleUpdate}

    />

          <span className={`${sty1} transition-all duration-200 ease-in-out`}>
            <button >
            <Image
            alt="loading.."
            width={10}
            height={10}
            src={"/right.svg"}
            onClick={()=>updateMessage(itr.id)}
            className={`${isEdit?'block':'hidden'} size-6 mr-2`}
            />
            </button>
            <button >
            <Image
            alt="loading.."
            width={10}
            height={10}
            onClick={()=>setIsEdit(false)}
            src={"/wrong.svg"}
            className={`${isEdit?'block':'hidden'} size-6 mr-2`}
            />
            </button>
            <button >
            <Image
            alt="loading.."
            width={10}
            height={10}
            src={"/doc.svg"}
            className={`${isEdit?'hidden':'block'} size-6 mr-2`}
            />
            </button>
            <button onClick={()=>loadMessages()}>
            <Image
            alt="loading.."
            width={10}
            height={10}
            src={"/edit.svg"}
            className={`${isEdit?'hidden':'block'} size-6 mr-2`}
            />
            </button>
            <button onClick={()=>deleteMessage(itr.id)}>
            <Image
            alt="loading.."
            width={10}
            height={10}
            src={"/delete.svg"}
            className={`${isEdit?'hidden':'block'} size-6 mr-2`}
            />
            </button>

           
        

          </span>
          </div>
          </div>
      
          </div>


    ):(
      <div    key={index} className='w-full flex flex-row justify-start items-center left-0 '>
      <div
            key={index}
            className="rounded-md md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] p-2 ml-4  bg-orange-600 mb-4 flex flex-row  items-center "
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



  <div className='w-full   right-0 flex flex-col mt-2 mr-2 '>
  {
messages.map((itr:any, index) => (
itr.sender===email?(
<div   key={index} className='w-full flex flex-row justify-end items-center right-0 '>
  <div
          
            className="rounded-md md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] p-2 mr-4 bg-cyan-400 mb-4"
          >
            {itr.message}
          </div>
          </div>
    ):(
<div key={index} className='w-full flex flex-row justify-start items-center left-0 '>
      <div
      key={index}
            className="rounded-md md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] p-2 ml-4 bg-orange-600 mb-4"
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






      </div>
    </div>


    <div className=' search  w-full flex flex-row justify-center items-center  h-16 fixed mb-0 dark:bg-gray-900 bg-white'>

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
  );
  
}
export default Chat_msg;


