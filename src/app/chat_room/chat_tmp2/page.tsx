
import * as React from 'react'
import { Database,Friend_list , Room_names} from '../../types/database.types'
import { Session,createServerComponentClient,createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import RoomTemp from './room_tmp2'
type F_type=Friend_list['frnd']
type r_type=Room_names['Rooms']
type C_type=Database['public']['Tables']["Chat_room"]['Row']
export const metadata: Metadata = {
  title: 'Chatroom',
}

async function Chat_tmp_page() {
  var email:string|undefined
var email:string|undefined
var pic: string | undefined
var username: string | undefined
var id: any | undefined
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
    var sessionCheck = false;
    if (session) {
       email = session?.user.email;
       pic = session?.user.user_metadata.avatar_url;
       username = session?.user.user_metadata.full_name;
      sessionCheck = true;
      var id: any | undefined = session?.user.id;
      if (username === undefined||'') {
        username = email?.split("@")[0];
      }

  
 
    

    }



  return (
    <div className="flex flex-row w-full h-full">
      <RoomTemp Email={email} pic={pic} username={username} sessionCheck={sessionCheck} Id={id} session={session}/>
    </div>
  )
}

export default Chat_tmp_page
