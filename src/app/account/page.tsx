import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types/database.types'
import AccountForm from './account-form'
import Chat_room from '../chat_room/page'
import Landing_page from "../Home_components/landing_page"
export default async function Account() {


  return <Landing_page/>
}