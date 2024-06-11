
import * as React from 'react'
// import TopBar from '../../top_bar'
import Chat_profiles from '../chat_profile/page'
import Chat_profiles_mob from '../chat_profile_mob/page'
import { Database,Friend_list , Room_names} from '../../types/database.types'
import { Session,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Chat_server from '../../server_runner/page'
import Chat_msg from '../../api/socket_client/client'

type F_type=Friend_list['frnd']
type r_type=Room_names['Rooms']
type C_type=Database['public']['Tables']["Chat_room"]['Row']
async function RoomTemp() {
var email:string|undefined
var c_data:F_type[]=[]
var roomNames:r_type[]=[]

  const supabase = createServerComponentClient<Database>(
    { cookies },

    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

if(session)
  {
    email = session?.user.email;
    const { data:f_data, error:f_err } = await supabase
      .from("Friends")
      .select("f_name, f_avatar, f_mail")
      .eq("user", email);
    if (f_data) {
        c_data=f_data
  
 
    }
    const { data:r_data, error:r_err } = await supabase
    .from('Chat_room')
    .select('room_name')
    .ilike("room_name", `%${email}%`)

  if (r_data) {
    roomNames = r_data;

  }
  
  if(r_err){
// window.alert("Error in fetching chat")
  }
  
  }





  return (
    <div className=" w-full h-screen  dark:bg-gray-900 dark:text-white bg-gray-white text-gray-900">
    
        <div className="w-screen h-full flex flex-row ">
          <div className="w-full md:w-2/5 h-full flex flex-col">
            
            {/* <div className="w-full hidden md:block"> <TopBar /></div> */}
            
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>

            <div className='profile w-full flex flex-col'>

            <div className="w-full md:hidden"> <Chat_profiles_mob profiles={c_data} roomNames={roomNames}/></div>
            <div className="w-full hidden md:block"><Chat_profiles profiles={c_data} roomNames={roomNames}/></div>

            </div>
       
          </div>
            <div className="w-full md:hidden h-[80vh] rounded-t-xl"><Chat_msg/></div>
          </div>
      {/* //for md devices */}
          <div className="hidden md:block  w-3/5 h-full">
          <Chat_msg />
          </div>
        </div>

    </div>
  );
}

export default RoomTemp
