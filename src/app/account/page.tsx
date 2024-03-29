import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types/database.types'
import AccountForm from './account-form'
import Chat_room from '../chat_room/page'

export default async function Account() {
  const supabase = createServerComponentClient<Database>(
    { cookies },
    {supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE',
    supabaseUrl:'https://igscvhkqnkryacanuwqb.supabase.co'
    }
    
    )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // return <AccountForm session={session} />
  return <Chat_room session={session} />
}