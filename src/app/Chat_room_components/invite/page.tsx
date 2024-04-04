"use client"
import * as  React from 'react'
import  {UseAppContext}  from '../../index'
import { cookies } from 'next/headers'
import { Database } from '../../types/database.types'
import { Session, createClientComponentClient,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
export default function Invite() {
  const[recEmail,setRecEmail]=React.useState<string>("") 
  const[toast,setToast]=React.useState<boolean>(false) 
  var isSend:boolean=false
  const supabase = createClientComponentClient<Database>(
    {supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
    }
  )
  const context = UseAppContext();
  const {
    isLoading,
    setIsLoading,
    email,
    userName,
    avatar
    
  } = context || {};
const receiverEmailRef = React.createRef<HTMLInputElement>();
const receiverEmail = receiverEmailRef.current?.value;
var recAvatar:string=''
var recUsername:string=''

  const handleInvite = async () => {

try{
  const { data, error } = await supabase
  .from('profiles')
  .select('id')
  .eq('sender', email) // Check for sender email
  .eq('receiver', recEmail) // Or check for receiver email
  .single();

if (error) {
  console.error('Error checking sender/receiver:', error);
} else {
isSend=true
}
}
catch{

}


if(isSend){

  try{
  const { data, error } = await supabase.from('profiles').select('avatar_url,username').eq('email', recEmail);
  
  if(data)
  {
  recAvatar=data[0].avatar_url
  recUsername=data[0].username
  }
  if(error){ window.alert('Error sending invite,try after sometime.');
  }
  }
  catch{
  // window.alert("Friend requset has been sent")
  }
  
  try {
    const { error } = await supabase.from('Invite').insert([
      {
        sender: email,
        receiver: recEmail,
        sender_name: userName,
        rec_username:recUsername,
        isDone: false,
        created_at: new Date().toISOString(),
        avatar_url:avatar,
        rec_avatar:recAvatar
  
      },
    ]);
    if(error)
    {
      console.log(error)
    }
    console.log('Invite sent:', recEmail);
  } catch (error) {
    console.error('Error sending invite:', error);
  } finally {
  
  }


}


  };
  return (
    <div className="w-full  flex flex-row justify-center items-center p-3 transition ease-in delay-200 duration-1000">
      <div className="w-full md:w-2/5 h-40 flex  flex-col md:flex-row justify-center items-center rounded-md dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black bg-gradient-to-r from-white via-gray-600 to-black dark:text-gray-900 bg-gray-900 text-white">
        <div className="mb-3 md:mb-0 w-full flex flex-row justify-center items-center md:w-4/5 rounded-lg">
          <input
            name="Email"
            type="email"
            className=" w-4/5 outline-none rounded-[24px] p-2 dark:text-gray-900 dark:bg-white"
            placeholder="Enter a valid email"
            value={recEmail}
            onChange={(event) => setRecEmail(event.target.value)}
          />
        </div>
        <div className="w-1/5 flex flex-row justify-center items-center">
          <button className=" flex flex-row justify-center items-center w-16 h-8 bg-purple-800 hover:bg-purple-400 text-white text-sm rounded-md" onClick={handleInvite}>
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}


