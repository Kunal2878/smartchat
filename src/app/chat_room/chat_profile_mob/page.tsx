'use client'
import * as React from 'react'
import Image from 'next/image'
import { Database,Friend_list , Room_names} from '../../types/database.types'
import  {UseAppContext}  from '../../index'
// type F_type=Friend_list['frnd']
// type r_type=Room_names['Rooms']
function Chat_profile_mob({profiles,roomNames}:any)
{ 

    const context = UseAppContext();
    const { email,room,setRoom,avatar,isThemeMenu,setIsThemeMenu } = context || {};
    
    const findRoom = (f_mail:string) => {
      roomNames.map((itr:any) => {
        if(itr.room_name===`${email}${f_mail}`||itr.room_name===`${f_mail}${email}`){
          setRoom?.(itr.room_name)
        }
      })
    
    }
  return (
    <div className='w-full h-40  -z-2  flex flex-col dark:bg-gray-900 dark:text-white text-gray-900 bg-white mb-2'>


  



<div className="w-full h-full">


 
      <div className='w-full flex flex-row justify-between p-2 mb-4 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400'>
<div className='w-1/4'>Smartchat</div>
<div className="w-3/4 flex flex-row justify-end mr-2">
      <div className='size-8 flex justify-start rounded-full dark:bg-search-dark bg-search-light mr-2'></div>
      <div className='size-8 flex justify-start rounded-full dark:bg-dots-dark bg-dots-light mr-2 ' onClick={()=>{isThemeMenu? setIsThemeMenu?.(false):setIsThemeMenu?.(true)}}></div>
      <div className=" size-8">
                <Image
                  src={avatar||''}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full object-cover'
                />
              </div>
              </div>
      </div>
      <div className='w-full flex flex-row'>
      <div className='w-11/12 flex flex-row pl-2 overflow-hidden overflow-x-auto'>

      {
      
      
      profiles?.map((profile:any) => (
<div key={profile.f_mail} className='w-1/4 flex flex-col items-center'>
<div className="add size-10 flex flex-row justify-center rounded-full bg-slate-400">
                <Image
                unoptimized={true}
                  src={profile.f_avatar}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full object-cover rounded-full'
                  onClick={() => findRoom(profile.f_mail)}
                />
              </div>
              <div
                className="w-full flex flex-row justify-center text-[10px] mt-2 truncate"
       
              >{profile.f_name}</div>
          

</div>
      ))}
      </div>

<div className='w-1/12 mr-3'>
<div className=" size-10 flex justify-start rounded-full bg-slate-400">
                <Image
                  src="/plus_icon.svg"
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full object-cover'
                />
              </div>
</div>
      </div>
      </div>
      {/* <div className={`
     top-0 mt-6  w-1/2 h-80 bg-white overflow-hidden z-10
    transition duration-300 right-0
      ${isThemeMenu ? 'animate-slide_right_left' : '-translate-x-full'}
  
    `}>


  </div> */}
    </div>
  )
}

export default Chat_profile_mob
