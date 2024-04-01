
import All_components from './all_components'
import * as React from "react";
import { Session,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types/database.types'
export default async function LandingPage() {
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
  var sessionCheck=false
if(session){
  var email=session?.user.email
  var pic:string|undefined=session?.user.user_metadata.avatar_url
  var username:string|undefined=session?.user.user_metadata.full_name
  sessionCheck=true
var id:any|undefined=session?.user.id
  if(username===undefined)
  {

    username = email?.split('@')[0]
  }
}
  return (
    <div className=" relative mt-0 h-full w-full">
  
<All_components Email={email} pic={pic} username={username} sessionCheck={sessionCheck} Id={id} session={session}/>
      </div>
  );
}


