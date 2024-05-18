"use client"
import {UseAppContext} from '../index'
import React, { useCallback, useState, useEffect,useRef  } from 'react'
import { Database } from '../types/database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export default function Chat_room({ session } : any){
  const context = UseAppContext();

 ;


  const supabase = createClientComponentClient<Database>(
    {supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
    }
  )
const [invite, setInvite] = useState(true)
const [sendEmailStatus, setSendEmailStatus] = useState<string | null>(null);
const [showDiv, setShowDiv] = useState(false);
const user = session?.user
const handleSendEmail = async () => {

  try {
    const response = await fetch('/send_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: "kunal.paul@aus.ac.in",
        subject: "Chat Room Invitation",
        info: "Hello,\n Log in to the Smartchat app Join me in my chat room!"
      })
    });
    const data = await response.json();
    if(data.status===200)
    {
      console.log("email sent successfully");
    }
    else if(data.status === 404)
    {
      console.log("something went wrong in sending email");
    }
    setSendEmailStatus(data.message);
  } catch (error) {
    console.error('Error sending email client :', error);
    setSendEmailStatus('Failed to send email. Please try again.');
  }
};




const getUserChat = useCallback(async () => {

  try {
   

    const { data, error, status } = await supabase
    .from('Chat_room')
    .select('id') 
    .limit(1)


    if (error && status !== 406) {
      console.log("error occured");
      console.log(error)
    }

    if (data?.length===0) {
      console.log("Insert in the table")
      const {data,error} = await supabase
      .from('Chat_room')
      .insert({ id: user?.id}).select();
      console.log(data, error)
    }

    else{

      setInvite(false)
    }
  } catch (error) {
    alert('Error loading user data!')
  } finally {
  
  }
}, [user, supabase])

useEffect(() => {
  getUserChat()
}, [user, getUserChat])

useEffect(() => {
 
  const timerId = setTimeout(() => {
setShowDiv(true)

  }, 1000);


  return () => clearTimeout(timerId);
}, []);

return (
    <div className="text-white">Loading......
      {showDiv && (
        <div className=" pro w-screen flex-col justify-center align-middle dark:bg-gray-900 dark:text-white bg-gray-white text-gray-900"> 
          {invite && (
            <div className='w-full'>
          <div className='w-full md:text-base'>Welcome to SmartChat</div>
            <div className='w-full flex-row justify-center align-middle'>
             <h2 className='text-slate-400'> You have no friends, Invite friends</h2> 
 
            </div>

            <button className='w-1/6 text-white text-base flex-row justify-center align-items-center rounded-md bg-purple-700 hover:bg-purple-400' onClick={handleSendEmail}>Invite</button>
            </div>
          ) }

        </div>
      )}
    </div>
  );

}


