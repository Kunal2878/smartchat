'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, darkThemes } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../types/database.types'

export default function AuthForm() {
  const supabaseUrl = 'https://igscvhkqnkryacanuwqb.supabase.co'

  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE' ;
  const supabase = createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey: supabaseAnonKey
  });
  interface GoogleScopes {
    readonly calendar: string;
    readonly profile: string;
    readonly email: string;
  }
  
  const scopes: GoogleScopes = {
    calendar: 'https://www.googleapis.com/auth/calendar.readonly',
    profile: 'https://www.googleapis.com/auth/userinfo.profile',
    email: 'https://www.googleapis.com/auth/userinfo.email',
  };
  
  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      socialLayout="horizontal"
      showLinks={true}
     
      appearance={{
       theme:ThemeSupa
        // style: {
        //   container:{background:'orange', display:'block'},
        //   button: { background: 'red', color: 'white', borderRadius:'10px' },
        //   anchor: { color: 'blue' },
        //   input:{borderRadius:'20px'},
         
        //   //..
        // },
      }}
     
      queryParams={{
        access_type: 'offline',
        prompt: 'consent',
       
      }}
      providers={['facebook','google', 'twitter']}
      providerScopes={{
        google: scopes.calendar + ' ' + scopes.profile + ' ' + scopes.email
      }}
      
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}