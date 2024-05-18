'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, darkThemes } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../types/database.types'
import  {UseAppContext}  from '../../index'
import Image from 'next/image'
export default function AuthForm() {
  const context = UseAppContext();
  const {

    isLoading,
    setIsLoading,
    email,
    setEmail,
    avatar,
    setAvatar,
    isSession,
    setIsSession,
  } = context || {};



  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  });
  interface GoogleScopes {
    readonly calendar: string;
    readonly profile: string;
    readonly email: string;
  }

  const scopes: GoogleScopes = {
    calendar: "https://www.googleapis.com/auth/calendar.readonly",
    profile: "https://www.googleapis.com/auth/userinfo.profile",
    email: "https://www.googleapis.com/auth/userinfo.email",
  };

  return (
    <div className=" transition ease-in-out delay-400 duration-1000 w-full min-h-screen flex flex-row justify-center items-center  dark:bg-gray-900 dark:text-white bg-white  text-gray-900 p-3">
    <div className="  w-full h-full  flex flex-col dark:bg-white md:w-2/5 p-3 rounded-md border-2 border-t-purple-300 border-r-red-300 border-l-cyan-300 border-b-green-300 drop-shadow-xl dark:shadow-gray-300 shadow-gray-800  hover:border-4" >
      <div className=" w-full flex flex-row justify-center items-center">
      <div className=" size-12">
<Image
width={10}
height={10}
src="/brand.svg"
alt="Loading..."
className='size-full'

/>
      </div>
      </div>
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      socialLayout="horizontal"
      showLinks={true}
      appearance={{
        theme: ThemeSupa,
        style: {
        //   container:{width:"100%", background:'orange', display:'block'},
          button: { background: 'purple', color: 'white', borderRadius:'10px' },
          anchor: { color: 'blue' },
        //   input:{borderRadius:'20px'},

          
        },
      }}
      queryParams={{
        access_type: "offline",
        prompt: "consent",
      }}
      providers={[  "google",
      // "facebook",
      // "twitter"
    ]}
      providerScopes={{
        google: scopes.calendar + " " + scopes.profile + " " + scopes.email,
      }}
      // redirectTo="http://localhost:3000/auth/callback"
      redirectTo={process.env.NEXT_PUBLIC_AUTH_URL}
    />
    </div>
    </div>
  );
}
