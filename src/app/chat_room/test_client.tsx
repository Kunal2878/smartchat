'use client'
import React, { useEffect, useState,useCallback } from 'react';
import Pusher from 'pusher-js';
import  {UseAppContext}  from '../index'
import { Database } from '../types/database.types'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Theme_menu from '../chat_room/theme_menu/page'
import Invite from '/chat_room/invite/page'

import {CopyToClipboard} from 'react-copy-to-clipboard';
const Chat_msg =   () => {

  const [message, setMessage] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [editedMessages, setEditedMessages] = useState<any>({});
  const context = UseAppContext();
  const { isThemeMenu,chatTheme,testRoom,testAvatar,testName} = context || {};
  const sty1="w-[100px]  top-0 mr-2  flex-row items-center justify-end hidden group-hover:flex pl-2"



  // Replace with your Pusher credentials (store securely)

  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  });


// join in a room or channel
useEffect(() => {
  const channel = pusher.subscribe(`${testRoom}`);
  channel.bind('new-message', (data: any) => {
    setMessages(prevMessages => [...prevMessages, data]);
  });

  return () => channel.unsubscribe();
}, [testRoom]);

function generateAlphabeticKey() {

    const alphabet = "abcdef@ghi345678jk$lmnop*qrst#uvwxyz1290";
    let key = "";
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
  
      key += alphabet[randomIndex];
    }
return key;
  }
  const onCopy: () => void = () => {
    setIsCopy(true);
  }



 
  
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
    setMessage('')
    let time=getFormattedDateTimeIso()
    let mesg = {
      message: messageInput,
      sender: testName || '',
      room:testRoom || '' ,
      avatar:testAvatar || '',
      time:time,
      id:generateAlphabeticKey()
    };
    try {
      const response = await fetch('https://pusher-chat-five.vercel.app/chat',  {
        cache: 'force-cache',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mesg)
      });

      if (!response.ok) {
        window.alert("Server failed to respond generate another id and rejoin")
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('Message sent:', data.message);
      setMessageInput('');
    } catch (error) {
      console.error(error);
    }

    
  }
// function to delete, update and copy a message a message 
async function deleteMessage(id:any) {
setEditedMessages({ ...editedMessages, [id]:'deleted' })
}

function loadMessages() {
  setIsEdit(true);


}



async function updateMessage(id:any,time:any) {

    
  setEditedMessages({ ...editedMessages, [time]: false })


  setIsEdit(false);


}


  return (

    <div className='static w-full  md:h-screen h-[80vh] overflow-y-auto pt-4'
    
    style={{ backgroundImage: `url(${chatTheme})`,backgroundPosition:"center", backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}
    
    >



{
 


  // ${isThemeMenu ? 'animate-slide_right_left' : '-translate-x-full'}
isThemeMenu&&(
<div className={` absolute top-0 left-0 mt-4 ml-6 w-full h-80 flex flex-row items-center
  
  `}
  style={{zIndex:1000}}
  >
<Theme_menu/>
</div>
)

}



<div className='  w-full mb-20 md:mb-0 pb-26 H-con  flex flex-col'   style={{zIndex:-10}}>
<div className=" hidden md:flex absolute top-0 w-full  flex-row justify-center items-center h-10 p-2 rounded-md text-white text-[10px] "> <div className=' p-2 rounded-md w-1/5 bg-gradient-to-tr from-indigo-900 dark:via-gray-800 to-gray-900  text-yellow-400 flex flex-row justify-center items-center'> <span className='mr-3'>{testName}</span>  <span> Chat id: {testRoom}</span> </div> </div>

<div className='w-full flex flex-col mt-8'>








{
messages.length>0&&(



  <div className='w-full   right-0 flex flex-col  mr-2 '>
  {
messages.map((itr:any, index) => (
  itr.sender===testName?(
    <div    key={index} className={`${editedMessages[itr.id]==='deleted'?'hidden':''} w-full flex flex-col items-center  mb-12`}>
    <div    className='w-full flex flex-row justify-end items-center'>

  
<div className=' group w-full h-auto flex flex-row justify-end items-center'
onMouseLeave={() => { 

    editedMessages[itr.id]===undefined?setEditedMessages({ ...editedMessages, [itr.id]:itr.message }):'';  setIsEdit(false)


     }}
>
<Image
src={itr.avatar}
alt="avatar"
width={10}
height={10}
className='rounded-full size-10 border-2 shadow-black dark:shadow-white shadow-md border-red-400 dark:border-cyan-400 mr-2'

/>
    <input
    className={`rounded-l-xl hover:-translate-x-1 transition ease-in-out delay-100 duration-800 md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px]   p-2 mr-4 flex flex-row text-white items-center bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500 focus:outline-none ${isEdit?"focus:ring-2 focus:ring-red-500":'outline-none'} `}
    
    value={editedMessages[itr.id] !== undefined ? editedMessages[itr.id] : (itr.message !== undefined ? itr.message : '')}
    onChange={(e) => setEditedMessages({ ...editedMessages, [itr.id]: e.target.value,[itr.time]:true })} 
 
    disabled={!isEdit} 
    onMouseLeave={() => { 
  
    editedMessages[itr.id]===undefined?setEditedMessages({ ...editedMessages, [itr.id]:itr.message }):'';  
    setIsEdit(false)
   
 
      }}
    // onBlur={handleUpdate}

  />
<span className={`${sty1} icon transition ease-linear duration-600 `}>

<button >
          <Image
          alt="loading..."
          width={10}
          height={10}
          src={"/right.svg"}
          onClick={()=>updateMessage(itr.id,itr.time)}
          className={`${isEdit || editedMessages[itr.time]?'block':'hidden'} size-6 mr-2`}
          />
          </button>

          <button >
          <Image
          alt="loading..."
          width={10}
          height={10}
          onClick={()=>{   setEditedMessages({ ...editedMessages,[itr.id]:itr.message, [itr.time]: false }); setIsEdit(false)}}
          src={"/wrong.svg"}
          className={`${isEdit||editedMessages[itr.time]?'block':'hidden'} size-6 mr-2`}
          />
          </button>

          <CopyToClipboard text={itr.message} onCopy={() => {itr.message,isCopy}}>
          <button >
          <Image
          alt="loading..."
          width={10}
          height={10}
          src={"/doc.svg"}
          className={`${isEdit||editedMessages[itr.time]?'hidden':'block'} size-6 mr-2`}
          onClick={()=>setIsCopy(true)}
          />
          </button>
       
      </CopyToClipboard>
          <button onClick={()=>loadMessages()}>
          <Image
          alt="loading.."
          width={10}
          height={10}
          src={"/edit.svg"}
          className={`${isEdit||editedMessages[itr.time]?'hidden':'block'} size-6 mr-2`}
          />
          </button>
          <button onClick={()=>deleteMessage(itr.id)}>
          <Image
          alt="loading.."
          width={10}
          height={10}
          src={"/delete.svg"}
          className={`${isEdit||editedMessages[itr.time]?'hidden':'block'} size-6 mr-2`}
          />
          </button>


        </span>

</div>
      
          

         
      

        {/* </div> */}
        </div>
    
        </div>


  ):(
<div key={index} className='w-full flex flex-row justify-start items-center left-0 ml-2 mb-12'>
      <Image
      src={itr.avatar}
      alt="avatar"
      width={10}
      height={10}
      className='rounded-full size-10 border-2 shadow-black dark:shadow-white shadow-md border-red-400 dark:border-cyan-400'
      />
      <div className="rounded-r-xl md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] p-2 ml-4 bg-gradient-to-r from-pink-500 via-purple-300 to-indigo-400"
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
<div className=' p-4 md:p-2 w-full backdrop-blur-sm bg-black/40 flex flex-row justify-center items-center   fixed bottom-0 '>

<input
className='rounded-full p-1 mr-4 right-5 shadow-sm shadow-white bg-white text-gray-900 outline-none' placeholder='Type your Message....'
type="text"
value={message}
onChange={(e) => {setMessage(e.target.value); setMessageInput(e.target.value)}}
/>

<button className="md:mr-10 size-12 md:size-8 flex  cursor-pointer justify-start rounded-full bg-gradient-to-r from-yellow-200 to-black disabled:cursor-not-allowed disabled:opacity-60"
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


