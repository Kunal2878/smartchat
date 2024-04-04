"use client"
import Image from 'next/image'
import * as React from 'react'

import { Database } from '../../types/database.types'
import { Session, createClientComponentClient,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
type Invite = Database['public']['Tables']['Invite']['Row']
export default function Notification({ invites }: { invites: Invite[] }) {
  const [accept, setAccept] = React.useState<string>("Add friend");
  // const [Invites, setInvites] = React.useState<Invite[]>([]);

  // const context = UseAppContext();
  // const { isLoading, setIsLoading, email, userName, avatar } = context || {};
  // // const test = "kunal.paul@aus.ac.in";
  const supabase = createClientComponentClient<Database>({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  // const fetchInvites = async () => {
  //   // Function to fetch invites

  //   try {
  //     const { data, error } = await supabase
  //       .from("Invite")
  //       .select("sender, receiver, sender_name, isDone, created_at, avatar_url")
  //       .eq("receiver", email)
  //       .order("created_at", { ascending: false });

  //     console.log(data);
  //     if (!error) {
  //       setInvites(data as Invite[]);
  //     } else {
  //       console.error("Error fetching invites:", error);
  //       // Handle error gracefully (e.g., display an error message)
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error:", error);

  //   } finally {
  //     // setIsLoading(false);
  //   }
  //   console.log(invites);
  // };
  //   fetchInvites();
  // React.useEffect(() => {
  //   setInvites(invites);
  // }, [invites]);

  const ConfirmInvite = async (sender_email: string, receiver_email: string) => {
    setAccept("Accepting...");
    try {
      const { error } = await supabase
        .from('Invite')
        .update({ isDone: true })
        .eq('receiver', receiver_email)
        .eq('sender', sender_email); // Filter by both sender and receiver email
  
      if (!error) {
        setAccept("Added");
        console.log('Invite confirmed:', sender_email, receiver_email);
        // Optionally, fetch invites again to reflect the update (consider refreshing UI)
      } else {
        setAccept("Add friend");
        window.alert('Error confirming invite');
     
        // Handle error gracefully (e.g., display an error message)
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      // Handle unexpected errors (e.g., network issues)
    }
  };



  return (
    <div className="w-full flex flex-row justify-center items-center p-3 ">
      <div className="dark:bg-gray-900 dark:text-white text-gray-900 bg-white  w-full h-[80vh] md:w-2/5 flex flex-col   rounded-md border-2 border-cyan-600 p-2 overflow-y-auto">
        {invites?.length >= 0 ? (
          invites.map((itr) => (
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
                  {itr.isDone?(accept==="Add friend"?"Added":accept):"Add friend"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex flex-row justify-center items-center dark:text-gray-400 text-base md:text-lg">
            You have no notifications
          </div>
        )}
      </div>
    </div>
  );
}




