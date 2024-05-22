
import All_components from './all_components'
import * as React from "react";
import { Session,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database,Friend_list , Room_names} from '../types/database.types'
import Body_com from './body_com';
import Footer from './footer'
type F_type=Friend_list['frnd']
type r_type=Room_names['Rooms']
import RoomTmp from '../chat_room/chat_tmp/page'
export default async function LandingPage() {
var c_data:F_type[]=[]
var roomNames:r_type[]=[]
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
    if (username === undefined) {
      username = email?.split("@")[0];
    }
    const { data:f_data, error:f_err } = await supabase
      .from("Friends")
      .select("f_name, f_avatar, f_mail")
      .eq("user", email);
    if (f_data) {
        c_data=f_data
        // console.log("friends are here",c_data)
  
 
    }
    const { data:r_data, error:r_err } = await supabase
    .from('Chat_room')
    .select('room_name')
    .ilike("room_name", `%${email}%`)

  if (r_data) {
    roomNames = r_data;

  }
  
  if(r_err){
console.log("error")
  }
  }

  return (
    <div className=" relative mt-0 h-full w-full">
      <All_components
        Email={email}
        pic={pic}
        username={username}
        sessionCheck={sessionCheck}
        Id={id}
        session={session}
      />
       <div className='w-full h-full'>

<Body_com/>
</div> 

<Footer/>
    </div>
  );
}


