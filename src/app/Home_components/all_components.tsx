"use client"
import Loader from '../loader'
import Home_beg from './home_beg'
import Home_rest_com from './home_rest_com'
import Feed from './feed'
import Navbar from '../navbar'
import * as React from "react";
import  {UseAppContext}  from '../index'
import { cookies } from 'next/headers'
import { Database } from '../types/database.types'
import { Session, createClientComponentClient,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
export default   function All_components({ Email,pic,username,sessionCheck,Id,session } : { Email: string|undefined,pic:string|undefined,username:string|undefined,sessionCheck:boolean ,Id:any|undefined,session:Session| null}) 

{
  const user=session?.user
  const supabase = createClientComponentClient<Database>(
    {supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
    }
  )
  const context = UseAppContext();
  const {  isLoading, setIsLoading, email, setEmail,avatar,setAvatar,isSession, setIsSession,setId,userName,setUserName } =context || {};



  React.useEffect(() => {
    if (sessionCheck) {
      setEmail?.(Email);
      setAvatar?.(pic);
      setIsSession?.(true);
      setIsLoading?.(false);
      setId?.(Id);
      setUserName?.(username)
      if(avatar==="solid_user.svg"){
        setAvatar?.(Email?.[0]?.toUpperCase());
      }
    }
  }, [sessionCheck, Email, pic]);

  const insertUser = React.useCallback(async () => {
    try {
      // Check if user exists (optional)
      const { data: existingUser, error: userError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user?.id)
        .single(); // Fetch only one record
  
      if (userError) {
        console.log("Error fetching user:", userError);
        return; 
      }
 
      if (!existingUser?.email) {
        
    const { data, error } = await supabase
    .from('profiles')
    .update({ // Update the existing profile
      email, // Replace with your email variable name
      username, // Replace with your username variable name
      avatar_url: avatar, // Replace with your avatarUrl variable name
    })
    .eq('id', user?.id) // Update profile where id matches provided value
    .single();
  
        console.log(data, error);
      } else {
        console.log("Profile already exists with email:", existingUser.email);
    
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error loading user data!');
    } finally {

    }
  }, []);
  React.useEffect(()=>{
    insertUser();
  },[email])





if(!sessionCheck){
   
         setTimeout(() => {
           setIsLoading?.(false);
         }, 2000); 

 } 
    

    
  
console.log(avatar)
  return (
    <div className="w-full">
        {
            isLoading ? (
          <Loader />
        ) : (
      <div className=" relative mt-0 h-full w-full">
        <Home_rest_com />
        <Home_beg />
        <Feed />
        <Navbar />
      </div>
        )
        }
    </div>
  );
}


