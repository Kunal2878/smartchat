'use client'
import * as React from 'react'
import Image from 'next/image'

import  {UseAppContext}  from '../../index'

function Chat_profile_mob({profiles,roomNames}:any)
{ 

    const context = UseAppContext();
    const { email,room,setRoom,avatar,isThemeMenu,setIsThemeMenu,isInvite,setIsInvite,userName } = context || {};
    
    const findRoom = (f_mail:string) => {
      const mail= f_mail.split('@')[0]
  roomNames.map((itr:any) => {
    if(itr.room_name===`${email?.split("@")[0]}${mail}`||itr.room_name===`${mail}${email?.split("@")[0]}`){
      setRoom?.(itr.room_name)
    }
      })
    
    }
  return (
    <div className='w-full h-36  -z-2  flex flex-col dark:bg-gray-900 dark:text-white text-gray-900 bg-white mb-2'>


  



<div className="w-full h-full">


 
      <div className='w-full flex flex-row justify-between p-2 mb-4 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400'>
      <div className='w-1/2 flex flex-row justify-center '>
      <div className="size-7 mt-1 flex flex-row rounded-full bg-slate-400 mr-1">
              <Image
                unoptimized={true}
                src="/brand.svg"
                width={40}
                height={40}
                alt="Picture of the author"
                className="size-full "
              />
            </div>
<span className=' w-3/4 text-[14px] flex flex-row justify-start font-bold bg-clip-text truncate text-transparent  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>{userName}</span>
      </div>
<div className="w-1/2 flex flex-row justify-between mr-2">
      <div className='size-8 flex justify-start rounded-full dark:bg-dots-dark bg-dots-light mr-2 ' onClick={()=>{isThemeMenu? setIsThemeMenu?.(false):setIsThemeMenu?.(true)}}></div>
      <div className=" size-8">
                <Image
                  unoptimized={true}
                  src={'/home.svg'}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full object-cover'
                />
              </div>
      <div className=" size-8  animate-ping ">
                <Image
                  unoptimized={true}
                  src={'/bell.svg'}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full object-cover'
                />
              </div>
      <div className=" size-8">
                <Image
                  unoptimized={true}
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
                  className='size-full rounded-full object-cover cursor-pointer'
                  onClick={()=> setIsInvite?.(true)}
                />
              </div>
</div>
      </div>
      </div>
      
    </div>
  )
}

export default Chat_profile_mob
