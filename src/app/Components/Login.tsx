'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, darkThemes } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../types/database.types'
import  {UseAppContext}  from '../index'

export default function AuthForm() {
  const context = UseAppContext();
  const {
    supaKey,
    supaUrl,
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
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      socialLayout="horizontal"
      showLinks={true}
      appearance={{
        theme: ThemeSupa,
        // style: {
        //   container:{background:'orange', display:'block'},
        //   button: { background: 'red', color: 'white', borderRadius:'10px' },
        //   anchor: { color: 'blue' },
        //   input:{borderRadius:'20px'},

        //   //..
        // },
      }}
      queryParams={{
        access_type: "offline",
        prompt: "consent",
      }}
      providers={["facebook", "google", "twitter"]}
      providerScopes={{
        google: scopes.calendar + " " + scopes.profile + " " + scopes.email,
      }}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
