
import * as React from 'react'
import TopBar from './top_bar'
import Chat_profiles from './chat_profile/page'
import Chat_profiles_mob from './test_profile_mob/page'
import { Database,Friend_list , Room_names} from '/types/database.types'
import { Session,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// import Chat_msg from '/api/socket_client/client'
import Chat_msg from './test_client'
import { Metadata } from 'next'
type F_type=Friend_list['frnd']
type r_type=Room_names['Rooms']
type C_type=Database['public']['Tables']["Chat_room"]['Row']

export const metadata: Metadata = {
  title: 'Chatroom',



}
async function RoomTemp() {





  return (
    <div className=" w-full h-screen  dark:bg-gray-900 dark:text-white bg-gray-white text-gray-900">
    
        <div className="w-screen h-full flex flex-row ">
          <div className="w-full md:w-2/5 h-full flex flex-col">
            
            <div className="w-full hidden md:block"> <TopBar /></div>
            
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>

            <div className='profile w-full flex flex-col'>
            <div className="w-full md:hidden"> <Chat_profiles_mob/></div>
            
            {/* 
            <div className="w-full hidden md:block"><Chat_profiles profiles={c_data} roomNames={roomNames}/></div> */}

            </div>
       
          </div>
            <div className="w-full md:hidden h-[80vh] rounded-t-xl"><Chat_msg/></div>
          </div>
      {/* //for md devices */}
          <div className="hidden md:flex  w-full h-full">
          <Chat_msg />
          </div>
        </div>

    </div>
  );
}

export default RoomTemp
