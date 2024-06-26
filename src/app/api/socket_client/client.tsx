'use client'
import React, { useEffect, useRef,useState,useCallback } from 'react';
import Pusher from 'pusher-js';
import  {UseAppContext}  from '../../index'
import { Database } from '../../types/database.types'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Theme_menu from '../../chat_room/theme_menu/page'
import Invite from '../../chat_room/invite/page'

import {CopyToClipboard} from 'react-copy-to-clipboard';

const Chat_msg = () => {
  let Room_msg=[]
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isAlert2, setIsAlert2] = useState<boolean>(true);
  const [editedMessages, setEditedMessages] = useState<any>({});
  const themeMenuRef = useRef(null);
  // const [isInvite, setIsInvite] = useState<boolean>(false);

  const [prevRoom, setPrevRoom] = useState<string | null|undefined>(null);
  
  
  const context = UseAppContext();
  const { email,room,rmsg,setRmsg,setRoom,setEmail,setIsThemeMenu,isThemeMenu,chatTheme,isInvite,setIsInvite} = context || {};
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
    channel.bind('alert', (data: any) => {
setIsAlert(true)
setTimeout(()=>{
  setIsAlert(false)
},2000)
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



async function updateMessage(id:any,time:any) {

  
  const{data,error}= await supabase.from('Chat').update({
    message:editedMessages[id]
    }).eq('id', id)
    if(error){window.alert("Error in updating, retry after sometime")}
    
  setEditedMessages({ ...editedMessages, [time]: false })


  setIsEdit(false);
 
  try {
    const response = await fetch('https://pusher-chat-five.vercel.app/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({room})
    });
if(response.ok){
setIsAlert2(false)
}
    else if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    console.log('Message sent:', data.message);
    setMessage('');
  } catch (error) {
    console.error(error);
  }



}

// const handleClickOutside = (event: any) => {
//   if (themeMenuRef.current && (themeMenuRef.current as HTMLElement).contains(event.target)) {
//     setIsThemeMenu?.(false);
//   }
// };


// useEffect(() => {
//   document.addEventListener('click', handleClickOutside);
//   // return () => document.removeEventListener('click', handleClickOutside);
// }, []);



  return (

    <div className='static w-full  md:h-screen h-[80vh] overflow-y-auto'
    
    style={{ backgroundImage: `url(${chatTheme})`,backgroundPosition:"center", backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}
    
    >
      {
      isAlert && isAlert2 && (
        <div className='absolute top-0 left-1/2 transition-opacity duration-1000 opacity-100  flex flex-row items-center justify-center w-[400px] bg-red-600 text-yellow-400 bg-opacity-50 text-[20px]'   style={{zIndex:1000}}>
       Messages are updated, refresh to see the updated messages
      </div>
      )}
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
/* <div ref={themeMenuRef} className={` absolute top-0 left-0 mt-4 ml-6 w-full h-80 flex flex-row items-center`} style={{ zIndex: 1000 }}>
{isThemeMenu && <Theme_menu />}
</div> */
}


{
isInvite&&(
  <div className='absolute top-1/2  transition-opacity duration-1000 opacity-100  flex flex-col items-center justify-center w-[400px] bg-black bg-opacity-50'   style={{zIndex:1000}}>
    <Invite/>
  </div>
)


}

<div className='  w-full mb-20 md:mb-0 pb-20 H-con  flex flex-col '   style={{zIndex:-10}}>

<div className='w-full flex flex-col '>


{


rmsg.length>0 &&(
<div className='w-full   right-0 flex flex-col mt-2 mr-2 '>
  {
    rmsg.map((itr:any,index:any)=>(

     

    itr.sender===email?(
      <div    key={index} className={`${editedMessages[itr.id]==='deleted'?'hidden':''} w-full flex flex-col items-center right-0 mb-12`}>
      <div    className='w-full flex flex-row justify-end items-center right-0'>

      <div   className=' message group md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] flex flex-col mr-4 '>


<div className='w-full h-auto flex flex-row justify-center items-center'
  onMouseLeave={() => { 

      editedMessages[itr.id]===undefined?setEditedMessages({ ...editedMessages, [itr.id]:itr.message }):'';  setIsEdit(false)
setIsCopy(false);
  
       }}
>
      <input
      className={`rounded-l-xl hover:-translate-x-1 transition ease-in-out delay-100 duration-800 w-10/12 min-h-[30px] max-h-auto p-2 mr-4 flex flex-row text-white items-center bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500 focus:outline-none ${isEdit?"focus:ring-2 focus:ring-red-500":'outline-none'} `}
      
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
            alt="loading.."
            width={10}
            height={10}
            src={"/right.svg"}
            onClick={()=>updateMessage(itr.id,itr.time)}
            className={`${isEdit || editedMessages[itr.time]?'block':'hidden'} size-6 mr-2`}
            />
            </button>

            <button >
            <Image
            alt="loading.."
            width={10}
            height={10}
            onClick={()=>{   setEditedMessages({ ...editedMessages,[itr.id]:itr.message, [itr.time]: false }); setIsEdit(false)}}
            src={"/wrong.svg"}
            className={`${isEdit||editedMessages[itr.time]?'block':'hidden'} size-6 mr-2`}
            />
            </button>

            <CopyToClipboard text={editedMessages[itr.id]!== undefined ?editedMessages[itr.id]:itr.message} onCopy={() => {editedMessages[itr.id]!== undefined ?editedMessages[itr.id]:itr.message,isCopy}}>
          <button >
          <Image
          alt="loading..."
          width={10}
          height={10}
          src={isCopy?'/right.svg':"/doc.svg"}
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
        
            

           
        

          </div>
          </div>
      
          </div>


    ):(
      <div    key={index} className='w-full flex flex-row justify-start items-center left-0 mb-12'>
      <div
           
            className="rounded-r-xl md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] p-2 ml-4  bg-gradient-to-r from-pink-500 via-purple-300 to-indigo-400  flex flex-row  items-center "
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



  <div className='w-full   right-0 flex flex-col  mr-2 '>
  {
messages.map((itr:any, index) => (
  itr.sender===email?(
    <div    key={index} className={`${editedMessages[itr.id]==='deleted'?'hidden':''} w-full flex flex-col items-center right-0 mb-12`}>
    <div    className='w-full flex flex-row justify-end items-center right-0'>

    <div   className=' message group md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] flex flex-col mr-4 '>

<div className='w-full h-auto flex flex-row justify-center items-center'
onMouseLeave={() => { 

    editedMessages[itr.id]===undefined?setEditedMessages({ ...editedMessages, [itr.id]:itr.message }):'';  setIsEdit(false)


     }}
>
    <input
    className={`rounded-l-xl hover:-translate-x-1 transition ease-in-out delay-100 duration-800 w-10/12 min-h-[30px] max-h-auto p-2 mr-4 flex flex-row text-white items-center bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500 focus:outline-none ${isEdit?"focus:ring-2 focus:ring-red-500":'outline-none'} `}
    
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
          alt="loading.."
          width={10}
          height={10}
          src={"/right.svg"}
          onClick={()=>updateMessage(itr.id,itr.time)}
          className={`${isEdit || editedMessages[itr.time]?'block':'hidden'} size-6 mr-2`}
          />
          </button>

          <button >
          <Image
          alt="loading.."
          width={10}
          height={10}
          onClick={()=>{   setEditedMessages({ ...editedMessages,[itr.id]:itr.message, [itr.time]: false }); setIsEdit(false)}}
          src={"/wrong.svg"}
          className={`${isEdit||editedMessages[itr.time]?'block':'hidden'} size-6 mr-2`}
          />
          </button>

          <CopyToClipboard text={editedMessages[itr.id]!== undefined ?editedMessages[itr.id]:itr.message} onCopy={() => {editedMessages[itr.id]!== undefined ?editedMessages[itr.id]:itr.message,isCopy}}>
          <button >
          <Image
          alt="loading..."
          width={10}
          height={10}
          src={isCopy?'/right.svg':"/doc.svg"}
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
      
          

         
      

        </div>
        </div>
    
        </div>


  ):(
<div key={index} className='w-full flex flex-row justify-start items-center left-0 mb-12'>
      <div
      key={index}
            className="rounded-r-xl md:min-w-[100px] md:max-w-[320px] min-w-[100px] max-w-[300px] p-2 ml-4 bg-gradient-to-r from-pink-500 via-purple-300 to-indigo-400"
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
<div className={`${room===''?'hidden':'flex'} p-4 md:p-2 w-full backdrop-blur-sm bg-black/40 flex flex-row justify-center items-center   fixed bottom-0 `}>

<input
className='rounded-full p-1 mr-4 right-5 shadow-sm shadow-white bg-white text-gray-900 outline-none' placeholder='Type your Message....'
type="text"
value={message}
onChange={(e) => setMessage(e.target.value)}
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


