import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import Loader from '../../loader'
export  async function POST(req: NextRequest) {
  console.log("outside")
  var isLoading: boolean = true;
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
    console.log("inside")
    await supabase.auth.signOut();
    isLoading = false;
  
  }

  return (
    NextResponse.redirect(new URL("/", req.url), {
      status: 302,
    })
    // <div className='w-full dark:bg-gray-900 bg-white'>Loading 
    //   {isLoading && (
    //     <Loader/>
    //   )}
    // </div>
  );
}
  