
"use client"
import { useEffect, useRef,useState,useCallback } from 'react';
import { io,Socket } from 'socket.io-client';
import {Message,Message2 } from '../../types/basic_types';
import  {UseAppContext}  from '../../index'
import { Database } from '../../types/database.types'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

interface c_msg {
  mail: string;
  content: string;
  room_name: string;
}
type C_msg=c_msg[]


type M_type=Message2['info']
const Chat_msg =   () => {
const context = UseAppContext();
const { email,room,rmsg,setRmsg } = context || {};
const [messages, setMessages] = useState<Message[]>([]);
const [messageInput, setMessageInput] = useState<string>('');
const [prevRoom, setPrevRoom] = useState<string | null|undefined>(null);

var Room_msg:M_type[]=[]
var arr: any = [];
var c_arr:any=[]
// Room_msg=[{mail:'kunalp', content:"What happened", room_name:'kpr'},{mail:'royr', content:"What are you doing", room_name:'kpr'},]
// setMessages([{mail:'kunalp', content:"What happened", room_name:'kpr'},{mail:'royr', content:"What have you done", room_name:'kpr'},])
const supabase = createClientComponentClient<Database>(
  {
    supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
  }
)

    const socketRef = useRef<Socket | null>(null);
 
    const joinRoom = useCallback(async () => {
      Room_msg=[]
      setRmsg?.([]);
      setMessages([]);
      setPrevRoom(prevRoom|| room)
      if (room) {
      
        const { data:r_data, error:r_error } = await supabase
          .from("Chat_room")
          .select("info")
          .eq("room_name", room)
        
        if(r_data){
   
          Room_msg = r_data[0].info;
   
          setRmsg?.(Room_msg)
   
        }
        else if(r_error){
        window.alert("Error in fetching data")
        }
        socketRef.current?.emit("join_room", room, email);
        socketRef.current?.on("error", (error) => {
          
          window.alert("Error in joining room")
        });
      }
    },[room]);
    
    useEffect(() => {
   
 joinRoom();
    //  updateRoom();
  }, [room]);
      
    useEffect(() => {

      if (!socketRef.current) {

        // socketRef.current = io('http://localhost:5000'); 
        socketRef.current = io(process.env.NEXT_PUBLIC_URL||'/'); 

      }
  
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }, []);
  


  

  

  
  useEffect(() => {
    socketRef.current?.on("connect", () => {});
    socketRef.current?.on("chat_message", async (message: Message) => {
   
      setMessages((prevMessages) => [...prevMessages, message]);
      const { data: f_data, error: f_error } = await supabase
        .from("Chat_room")
        .select("info")
        .eq("room_name", message.room_name);
      const newMessage = {
        mail: "new_mail@example.com",
        content: "New Message",
        room_name: "kunalpaul673@gmail.comroyr81860@gmail.com",
      };

      if (f_data) {

        arr = [...f_data.map((messageArray) => messageArray.info)];
         c_arr = [...arr[0]].concat(message);
        console.log(c_arr);


      }
      const { data: u_data, error: u_error } = await supabase
      .from("Chat_room")
      .update({
        info: c_arr,
      })
      .eq("room_name", message.room_name)
      if(u_error)
        {window.alert("Error in updating data")}
    });

  }, []);



  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const message: Message = {
        content: messageInput,
        mail: email || "",
        room_name:room || '' 
      };
      socketRef.current?.emit("chat_message", message);
      setMessageInput("");
    }
  };
  // setRmsg?.(Room_msg)
  // setMessages([])
  return (
    <div className='w-full  h-full overflow-hidden'
    
    style={{ backgroundImage: `url(/chatbg.jpg)`,backgroundPosition:"center", backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}
    
    >

<div className=' w-full  h-full flex flex-col'>

<div className='w-full flex flex-col  h-full  overflow-hidden hover:overflow-y-auto'>


{


rmsg.length>0 &&(
<div className='w-full h-full  right-0 flex flex-col mt-2 mr-2 '>
  {
    rmsg.map((itr:any)=>(
    itr.mail===email?(
  <div
            key={itr.mail}
            className="md:min-w-[50px] md:max-w-[120px] min-w-[40px] max-w-[80px] right-0 mr-4 flex flex-row  bg-purple-800 mb-4"
     
          >
            {itr.content}
          </div>
    ):(
      <div
            key={itr.mail}
            className="md:min-w-[50px] md:max-w-[120px] min-w-[40px] max-w-[80px] left-0 ml-4  bg-gray-600 mb-4 "
          >
            {itr.content}
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
messages.map((message, index) => (
message.mail===email?(
  <div
            key={index}
            className="md:min-w-[50px] md:max-w-[120px] min-w-[40px] max-w-[80px] right-0 mr-4 bg-purple-800 mb-4"
          >
            {message.content}
          </div>
    ):(
      <div
      key={index}
            className="md:min-w-[50px] md:max-w-[120px] min-w-[40px] max-w-[80px] left-0 ml-4 bg-gray-600 mb-4"
          >
            {message.content}
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
     className='rounded-md mr-4 dark:bg-white bg-gray-900 dark:text-gray-900 text-white outline-none' placeholder='Message....'
     type="text"
     value={messageInput}
     onChange={(e) => setMessageInput(e.target.value)}
     />

<div className="size-12 md:size-8 flex  cursor-pointer justify-start rounded-full bg-gradient-to-r from-yellow-200 to-black ">
    

  <Image
    src="/send_icon.png"
    width={10}
    height={10}
    alt="Picture of the author"
    className="w-full h-full object-cover"
    onClick={handleSendMessage}
  />
       </div>
     </div>
      </div>
    </div>
        </div>
  );
};

export default Chat_msg;
