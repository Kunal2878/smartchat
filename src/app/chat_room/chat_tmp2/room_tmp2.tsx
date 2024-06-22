'use client'
import * as React from 'react'
import TopBar from '../top_bar'
import Chat_profiles from '../chat_profile/page'
import Chat_profiles_mob from '../chat_profile_mob/page'
import { Database,Friend_list , Room_names} from '../../types/database.types'
import { Session,createServerComponentClient,createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Chat_msg from '../../api/socket_client/client'
import { Metadata } from 'next'
type F_type=Friend_list['frnd']
type r_type=Room_names['Rooms']
type C_type=Database['public']['Tables']["Chat_room"]['Row']


function RoomTemp({ Email,pic,username,sessionCheck,Id,session } : { Email: string|undefined,pic:string|undefined,username:string|undefined,sessionCheck:boolean ,Id:any|undefined,session:Session| null}) {
const [f_list, setFlist] = React.useState<F_type[]>([]);
const [fr_list, setFrlist] = React.useState<F_type[]>([]);
const [count, setCount] = React.useState<number>(0);
const [c_data, setC_data] = React.useState<F_type[]>([]);
const [roomNames, setRoomNames] = React.useState<r_type[]>([]);

var email:string|undefined



  const supabase = createClientComponentClient<Database>(


    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );


  const fetchSendConfirmInvites = async () => {


    try {
      const { data, error } = await supabase
        .from("Invite")
        .select(" receiver, rec_avatar,rec_username")
        .eq("sender", Email)
        .eq("isDone",true)
        .eq("isSender",false)
        // .eq("isnew",true) 
        .order("created_at", { ascending: false });
        if (data) {
       
        const flist = data.map((itr) => ({
          f_name: itr.rec_username,
          f_mail: itr.receiver,
          f_avatar: itr.rec_avatar,
          
        }));
     
        setFlist([...flist])
        for (const mail of flist) {
          await supabase
            .from("Invite")
            .update({ isSender: true })
            .eq("sender",Email) 
            .eq("receiver", mail.f_mail);
        }
        const { } = await supabase
        .from("Friends")
        .insert(flist.map(item => ({
            f_mail: item.f_mail,
            f_avatar:item.f_avatar,
            f_name:item.f_name,
            user:Email // Assuming f_mail maps to column2
            // ... other columns and their corresponding values
          })))
   
      } else {
        console.error("Error fetching invites:", error);
  
      }
    } catch (error) {
      console.error("Unexpected error:", error);
  
    } finally {
      // setIsLoading(false);
    }
  };
  
  
  
  const fetchRecConfirmInvites = async () => {
  
  
    try {
      const { data, error } = await supabase
        .from("Invite")
        .select("sender, sender_name, avatar_url")
        .eq("receiver", Email)
        .eq("isDone",true)
        .eq("isReceiver",false) 
        .order("created_at", { ascending: false });
        
        if (!error) {
          const flist = data.map((itr) => ({
            f_name: itr.sender_name,
            f_mail: itr.sender,
            f_avatar: itr.avatar_url,
       
          }));
        
          setFrlist([...flist])
  
  
  for (const mail of flist) {
    await supabase
      .from("Invite")
      .update({ "isReceiver": true })
      .eq("receiver", Email)
      .eq("sender",mail.f_mail); // Use f_mail for receiver comparison
  }
          const { } = await supabase
          .from("Friends")
          .insert(flist.map(item => ({
              f_mail: item.f_mail,
              f_avatar:item.f_avatar,
              f_name:item.f_name,
              user:Email // Assuming f_mail maps to column2
              // ... other columns and their corresponding values
            })))
      
  
        } else {
          console.error("Error fetching invites:", error);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        
      } finally {
        // setIsLoading(false);
      }
  
    };
    
  
    
    
    





    const fetchFriendsRoom= async () => {
      const { data:f_data, error:f_err } = await supabase
        .from("Friends")
        .select("f_name, f_avatar, f_mail")
        .eq("user", Email);
      if (f_data) {
          setC_data(f_data)
    
          
        }
        const { data:r_data, error:r_err } = await supabase
        .from('Chat_room')
        .select('room_name')
        .ilike("room_name", `%${Email?.split("@")[0]}%`)
    
      if (r_data) {
        setRoomNames( r_data);
    
      }
      
      
    }
    const InsertRoom= async () => {
      try{
        const { data: Data, error: r_err } = await supabase
        .from("Friends")
        .select("f_name, f_avatar, f_mail")
        .eq("user", email)
        .eq("ischat", false);

      if (Data) {
        var mail=email?.split("@")[0];
        Data.map(async (item) => {
          var mail2=item.f_mail.split("@")[0];
          try {
            
            const {  data: chatRoomData ,error: chatRoomError,} = await supabase
            .from("Chat_room")
            .select("room_name")
            .eq("room_name",`${mail}${mail2}${email?.split('@')[0]}`)
            // .eq("room_name",`${email?.split("@")[0]}${item.f_mail.split("@")[0]}`)
            const {  data: chatRoomData2, error: chatRoomError2, } = await supabase
            .from("Chat_room")
            .select("room_name")
            .eq("room_name",`${email?.split('@')[0]}${item.f_mail.split('@')[0]}`)
            if (!chatRoomData && !chatRoomData2) {
              const { data: c_data, error: c_err } = await supabase
              .from("Chat_room")
              .insert({
                room_name: `${email?.split("@")[0]}${item.f_mail.split("@")[0]}`
              });
              if (c_data || c_err ) {
                console.log("Error creating chat room:", c_err);
                console.log("data insreted", c_data);
              }
            }

            const { data: updateData,error: updateError } = await supabase
            .from("Friends")
            .update({ ischat: true })
            .eq("user", email)
            .eq("f_mail", `${item.f_mail}`);
       
       
       
          }
        catch {}
      });
      }
    }
      catch{

      }
    }
    
    
    React.useEffect(() => {
      const runFunctionsSequentially = async () => {
        try {
          const result1= await fetchFriendsRoom();
          const result2 = await fetchSendConfirmInvites();
          const result3 = await fetchRecConfirmInvites();
  
          
        } catch (error) {
          console.error("Error running functions:", error);
        }
      };
  
      runFunctionsSequentially();
  
    }, [count]);
    
    
    
    
    
//     if(r_err){
//   // window.alert("Error in fetching chat")
//     }
  
React.useEffect(() => {
setTimeout(() => {
setCount(count + 1);
},3000)

  },[count])
  
    
    






  return (
    <div className=" w-full h-screen  dark:bg-gray-900 dark:text-white bg-gray-white text-gray-900">
    
        <div className="w-screen h-full flex flex-row ">
          <div className="w-full md:w-2/5 h-full flex flex-col">
            
            <div className="w-full hidden md:block"> <TopBar /></div>
            
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>

            <div className='profile w-full flex flex-col'>

            <div className="w-full md:hidden"> <Chat_profiles_mob profiles={c_data} roomNames={roomNames}/></div>
            <div className="w-full hidden md:block"><Chat_profiles profiles={c_data} roomNames={roomNames}/></div>

            </div>
       
          </div>
            <div className="w-full md:hidden h-[80vh] rounded-t-xl"><Chat_msg/></div>
          </div>
      {/* //for md devices */}
          <div className="hidden md:flex  w-3/5 h-full">
          <Chat_msg />
          </div>
        </div>

    </div>
  );
}

export default RoomTemp
