"use client"
import React from 'react'
import TopBar from './top_bar'
import Chat_profiles from './chat_profiles'
import Chat_content from './chat_content'
import { useState, useEffect } from 'react'
function RoomTemp() {
  const [chk_frnd, setChk_frnd] = useState(true);
  return (
    <div className="w-full h-screen  dark:bg-gray-900 dark:text-white bg-gray-white text-gray-900">
      {chk_frnd ? (
        <div className="w-screen h-full flex flex-row ">
          <div className="w-full md:w-2/5 h-full flex flex-col">
            <div className="w-full"> <TopBar /></div>
            
            <div className='w-full overflow-hidden'>
            <div className="w-full"><Chat_profiles /></div>
            <div className=" w-full md:hidden  m-0 h-full"><Chat_content /></div>
          </div>
          </div>
      
          <div className="hidden md:block m-0 w-3/5 h-full">
            <Chat_content />
          </div>
        </div>
      ) : (
        <div className="text-slate-400">
          You Have no friends, Invite friends
        </div>
      )}
    </div>
  );
}

export default RoomTemp
