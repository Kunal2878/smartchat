"use client"
import React, { useCallback, useState, useEffect,useRef  } from 'react'
import { Database } from '../types/database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export default function Chat_room({ session } : { session: Session | null }){
  const supabase = createClientComponentClient<Database>(
    {supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE',
    supabaseUrl:'https://igscvhkqnkryacanuwqb.supabase.co'
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
    setSendEmailStatus(data.message); // Display success message
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
    <div>
      {showDiv && (
        <div className="pro">
          {invite ? (
            <div className='w-screen flex-col justify-center align-middle'>
             <h2 className='text-slate-400'> You have no friends, Invite friends</h2> 
            <button className='w-1/6 flex-row justify-center align-items-center' onClick={handleSendEmail}>Invite friends</button>
            </div>
          ) : (
            <button onClick={handleSendEmail}>Chat Room</button>
          )}
        </div>
      )}
    </div>
  );

}


