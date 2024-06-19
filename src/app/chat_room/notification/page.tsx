"use client"
import Image from 'next/image'
import * as React from 'react'
import Link from 'next/link'
import  {UseAppContext}  from '../../index'
import { Database,Friend_list } from '../../types/database.types'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
type Invite = Database['public']['Tables']['Invite']['Row']
type F_type=Friend_list['frnd']

// export default function Notification({ invites,f_list }: any) 
export default function Notification() 

{
  const [invites, setInvites] = React.useState<Invite[]>([]);
  const [f_list, setFlist] = React.useState<any>([]);
  const [accept, setAccept] = React.useState<string>("Add friend");
  const context = UseAppContext();
  const { setIsNotify, isSession,setIsLogin,email } = context || {};

  const supabase = createClientComponentClient<Database>({

    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,

  });




  const fetchInvites = async () => {
    // Function to fetch invites

    try {
      const { data, error } = await supabase
        .from("Invite")
        .select("sender, receiver, sender_name, isDone, created_at, avatar_url")
        .eq("receiver", email)
        .eq("isDone", false)
        .order("created_at", { ascending: false });
      const { data:Data, error:Error } = await supabase
        .from("Invite")
        .select("rec_avatar, rec_username")
        .eq("sender", email)
        .eq("isDone", true)
        .order("created_at", { ascending: false });

      if (!error) {
        console.log(data)
        setInvites(data as Invite[]);
      } 
      if(Data)
      {
console.log("data is here from notification",Data)
setFlist(Data);
      }
      else {
        console.error("Error fetching invites:", error);
        // Handle error gracefully (e.g., display an error message)
      }
    } catch (error) {
      console.error("Unexpected error:", error);

    } finally {
      // setIsLoading(false);
    }

  };
  React.useEffect(() => {
    fetchInvites();
 
  }, [invites]);

  const ConfirmInvite = async (sender_email: string, receiver_email: string) => {
    setAccept("Accepting...");
    console.log("adding")
    try {
      const { error } = await supabase
        .from('Invite')
        .update({ isDone: true })
        .eq('receiver', receiver_email)
        .eq('sender', sender_email); 
  
      if (!error) {
        setAccept("Added");
        console.log('Invite confirmed:', sender_email, receiver_email);
      } else {
        setAccept("Add friend");
        window.alert('Error confirming invite');
     
        
      }
    } catch (error) {
      console.error('Unexpected error:', error);

    }
  };



  return (
    <div className="w-full flex flex-row justify-center items-center p-3 ">
      
      <div className="dark:bg-gray-900 dark:text-white text-gray-900 bg-white  w-full h-[80vh] md:w-2/5 flex flex-col   rounded-md border-2 border-cyan-600 p-2 overflow-y-auto">

        <div className="w-full flex flex-row justify-center items-center p-2">
        <Link href='/' className= ' w-16 rounded-lg bg-gradient-to-r from-black to-red-500 cursor-pointer flex flex-row justify-center items-center' onClick={()=>{setIsNotify?.(false)}} >
          <Image
          src={"/cross.png"}
          width={20}
          height={20}
          alt="loading..."
 />
        </Link>
        </div>
{!isSession&&(
  <div className='w-full h-full flex flex-row justify-center items-center'>
    <button className=' w-24 h-12 lg:w-24 lg:h-8 bg-violet-800 text-[10px] hover:bg-violet-500 text-white  top-1/2 p-2 rounded-md  font-800'onClick={()=>{setIsLogin?.(true);setIsNotify?.(false)}}>Login/Signup</button>
  </div>
)}



        {
        
        isSession && (invites?.length >= 0 || f_list?.length >= 0) ? (
          <>
            {invites.map((itr:any) => (
              <div
                className="w-full flex flex-row  rounded-sm justify-start dark:bg-indigo-900 bg-indigo-200 backdrop-blur-sm p-3 mb-3"
                key={itr.id}
              >
                <div className="w-1/5">
                  <Image
                    width={40}
                    height={40}
                    src={itr.avatar_url || ""}
                    alt={itr.avatar_url || ""}
                    className="rounded-full"
                  />
                </div>
                <div className="w-2/5 flex flex-row items-center text-[12px]">
                  You have a friend request from {itr.sender_name}
                </div>
                <div className="w-2/5 flex flex-row justify-center items-center">
                  <button
                    onClick={() => ConfirmInvite(itr.sender, itr.receiver)}
                    className="flex flex-row justify-center items-center w-20 h-8 bg-purple-600 hover:bg-purple-400 text-white text-sm rounded-md"
                  >
                    {accept}
                  </button>
                </div>
              </div>
            ))}
            {f_list.map((itr:any,index:any) => (
               <div
               className="w-full flex flex-row  rounded-sm justify-start dark:bg-indigo-900 bg-indigo-200 backdrop-blur-sm p-3 mb-3"
               key={index}
             >
               <div className="w-1/5">
                 <Image
                   width={40}
                   height={40}
                   src={itr.rec_avatar || ""}
                   alt={itr.f_avatar || ""}
                   className="rounded-full"
                 />
               </div>
               <div className="w-2/5 flex flex-row items-center text-[12px]">
                 {itr.rec_username} has accepted your request
               </div>
            
             </div>
            ))}
          </>
        ) : (
          <div className="w-full h-full flex flex-row justify-center items-center dark:text-gray-400 text-base md:text-lg">
            You have no notifications
          </div>
        )}
      </div>
    </div>
  );
}




