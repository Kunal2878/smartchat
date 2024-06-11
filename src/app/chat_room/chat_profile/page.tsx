'use client'
import React from 'react'
import Image from 'next/image'
import { Database,Friend_list , Room_names} from '../../types/database.types'
import  {UseAppContext}  from '../../index'
function Chat_profiles({ profiles, roomNames }: any) {  
const context = UseAppContext();
const { email,room,setRoom } = context || {};
const findRoom = (f_mail:string) => {
  roomNames.map((itr:any) => {
    if(itr.room_name===`${email}${f_mail}`||itr.room_name===`${f_mail}${email}`){
      setRoom?.(itr.room_name)
    }
  })

}
  return (
    <div className='dark:bg-gray-900 dark:text-white text-gray-900 bg-white  w-full h-screen flex-col justify-center align-middle overflow-hidden'>




      <div className='w-full h-full top-profiles grid grid-row-1 grid-flow-row gap-1 tb:gap-2'>

          <div className='add_profiles h-screen pb-8 dark:bg-indigo-800 bg-indigo-300 w-full flex flex-col p-2 hover:overflow-y-scroll'>
          {profiles?.map((profile:any) => (
            <div
              key={profile.f_mail}
              className="profiles mb-2 w-full text-white flex flex-row justify-start align-middle"
            >
              <div className="add size-10 flex justify-start rounded-full bg-slate-400">
                <Image
                  src={profile.f_avatar}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full'
                />
              </div>
              <div
                className="flex grow justify-start items-center pl-1 cursor-pointer"
                onClick={() => findRoom(profile.f_mail)}
              >{profile.f_name}</div>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
}

export default Chat_profiles;

