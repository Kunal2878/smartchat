import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import  {  type NextRequest, NextResponse } from 'next/server'
import Loader from '../../loader'
export  async function POST(req: NextRequest) {

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient(
    { cookies: () => cookieStore },
    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {

    await supabase.auth.signOut();

  
  }

  return (

    // NextResponse.redirect(new URL("/", "http://localhost:3000"),
    NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_URL),
    
    {
      status: 302,
    })

  );
}
  