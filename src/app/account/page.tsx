import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types/database.types'
import AccountForm from './account-form'
import Chat_room from '../chat_room/page'
import Landing_page from "../Home_components/landing_page"
export default async function Account() {


  // const supabase = createServerComponentClient<Database>(
  //   { cookies },

  //   {supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //   supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
  //   }
    
  //   )

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  // return <AccountForm session={session} />

  // console.log(session)
// setEmail?.(session?.user.email || "");
  // return <Chat_room session={session} />
  return <Landing_page/>
}