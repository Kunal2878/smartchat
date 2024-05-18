"use client"
import Loader from '../loader'
import Home_beg from './home_beg'
import Home_rest_com from './home_rest_com'
import Feed from './feed'
import Navbar from '../navbar'
import Notification from '../Chat_room_components/notification/page'
import Invite from '../Chat_room_components/invite/page'
import Chat_profiles from '../Chat_room_components/chat_profile/page'
import * as React from "react";
import RoomTmp from '../Chat_room_components/chat_tmp/page'
import  {UseAppContext}  from '../index'
import { cookies } from 'next/headers'
import { Database,Friend_list } from '../types/database.types'

import { Session, createClientComponentClient,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
type Invite = Database['public']['Tables']['Invite']['Row']
type F_type=Friend_list['frnd']
export default   function All_components({ Email,pic,username,sessionCheck,Id,session } : { Email: string|undefined,pic:string|undefined,username:string|undefined,sessionCheck:boolean ,Id:any|undefined,session:Session| null}) 

{
  const [invites, setInvites] = React.useState<Invite[]>([]);
  const [coinvites, setCoInvites] = React.useState<Invite[]>([]);
  const [f_list, setFlist] = React.useState<F_type[]>([]);
  const [fr_list, setFrlist] = React.useState<F_type[]>([]);
  const [chat_f, setChat_f] = React.useState<F_type[]>([]);

  const user=session?.user
  const supabase = createClientComponentClient<Database>(
    {
      supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
    }
  )
  const context = UseAppContext();
  const { isLogin,setIsNotify, isLoading, setIsLoading, email, setEmail,avatar,setAvatar,isSession, setIsSession,setId,userName,setUserName,isNotify } = context || {};




  React.useEffect(() => {
    if (sessionCheck) {
      setEmail?.(Email);
      setAvatar?.(pic);
      setIsSession?.(true);
      setIsLoading?.(false);
      setId?.(Id);
      setUserName?.(username)
    
      if(pic===undefined)
      {
        if(avatar==="solid_user.svg"){
              setAvatar?.(Email?.[0]?.toUpperCase());
            }
      }
    }
  }, [ Email]);



  const insertUser = React.useCallback(async () => {
    try {
     
    const { data, error } = await supabase
    .from('profiles')
    .update({ 
   
      email, 
      username, 
      avatar_url: avatar, 
    })
    .eq('id', user?.id) 
    .single();
  
    } catch (error) { 
      console.error('Error:', error);
      alert('Error loading user data!');
    } finally {

    }
  }, [email,avatar,username]);




  const updateUser = React.useCallback(async () => {
    const { data, error } = await supabase
    .from('Invite')
    .update({ 
      rec_username: userName,
      rec_avatar: avatar, 
    })
    .eq('receiver', email) 
    .single();
  },[email,avatar])

  React.useEffect(()=>{
    insertUser();
    updateUser();
  },[email,avatar,username])


  const fetchInvites = async () => {
    try {
      const { data, error } = await supabase
        .from("Invite")
        .select("sender, receiver, sender_name, avatar_url")
        .eq("receiver", email)
        .eq("isDone", false)
        .order("created_at", { ascending: false });

      if (!error) {
        setInvites(data as Invite[]);
      } else {
        console.error("Error fetching invites:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);

    } finally {
    
    }

  };

React.useEffect(() => {
   fetchInvites();
},[email])

const fetchSendConfirmInvites = async () => {


  try {
    const { data, error } = await supabase
      .from("Invite")
      .select(" receiver, rec_avatar,rec_username")
      .eq("sender", email)
      .eq("isDone",true)
      .eq("isnew",true) 
      .order("created_at", { ascending: false });
      if (data) {
     
      const flist = data.map((itr) => ({
        f_name: itr.rec_username,
        f_mail: itr.receiver,
        f_avatar: itr.rec_avatar,
        
      }));
   
      setFlist([...flist])
      const { } = await supabase
      .from("Friends")
      .insert(flist.map(item => ({
          f_mail: item.f_mail,
          f_avatar:item.f_avatar,
          f_name:item.f_name,
          user:Email // Assuming f_mail maps to column2
          // ... other columns and their corresponding values
        })))
      const { } = await supabase
      .from("Invite")
      .update({isnew:false})
      .eq("sender", email)
      
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
      .eq("receiver", email)
      .eq("isDone",true)
      .eq("isnew",true) 
      .order("created_at", { ascending: false });
      
      if (!error) {
        const flist = data.map((itr) => ({
          f_name: itr.sender_name,
          f_mail: itr.sender,
          f_avatar: itr.avatar_url,
     
        }));
      
        setFrlist([...flist])
        const { } = await supabase
        .from("Friends")
        .insert(flist.map(item => ({
            f_mail: item.f_mail,
            f_avatar:item.f_avatar,
            f_name:item.f_name,
            user:Email // Assuming f_mail maps to column2
            // ... other columns and their corresponding values
          })))
        const { } = await supabase
      .from("Invite")
      .update({isnew:false})
      .eq("receiver", email)
    
      

      } else {
        console.error("Error fetching invites:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      
    } finally {
      // setIsLoading(false);
    }

  };
  





  
  // const uniqueFlist = React.useMemo(() => {
//   const seen = new Set();
  
//   const uniqueArrays = f_list.filter((arr) => {
//     const allUnique = !seen.has(arr);
//     seen.add(arr);
//     return allUnique;
//   });
  
//   return uniqueArrays;
// }, [f_list]);

// React.useEffect(()=>{
  // setFlist(uniqueFlist)
// },[f_list])





// React.useEffect(() => {
//   fetchSendConfirmInvites();
//   fetchRecConfirmInvites();
//   makeChatRoom();
// },[email])
  React.useEffect(() => {
    const runFunctionsSequentially = async () => {
      try {
     
        const result1 = await fetchSendConfirmInvites();


        const result2 = await fetchRecConfirmInvites();

        
      } catch (error) {
        console.error("Error running functions:", error);
      }
    };

    runFunctionsSequentially();

  }, [email]);

  const fetchFriends = async () => {
    try {
      const { data, error } = await supabase
        .from("Friends")
        .select("f_name, f_avatar, f_mail")
        .eq("user", email || "")
        .eq("isChat",false)

      if (!error) {
        const { data: roomData, error: roomError } = await supabase
          .from("Chat_room")
          .insert(
            data.map((item) => ({
              room_name: `${email || ""}${item.f_mail}`,
  
            }))
          )
          
        if (!roomError) {
          setChat_f(data);
        } else {
          console.error("Error inserting chat rooms:", roomError);
        }
      } else {
        console.error("Error fetching invites:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      // setIsLoading(false);
    }
  };

React.useEffect(() => {
fetchFriends();
},[email])







  if(!sessionCheck){
    
    setTimeout(() => {
      setIsLoading?.(false);
    }, 2000); 

 } 


  return (
    <div className="w-full">
        {
            isLoading ? (
          <Loader />
        ) : (
      <div className=" relative mt-0 h-full w-full">
        <Home_rest_com />
        <Home_beg />
        <Navbar />
        {/* <Invite/> */}
       {isNotify && (

       (invites.length>=0 ||f_list.length>=0) &&(

         <div className=" z-40 w-full fixed top-8">
         <Notification invites={invites} f_list={f_list}/>
         
         </div>
       )
       )}

{/* {isLogin&&( */}

 <div className='w-full h-full'>
  {/* <RoomTmp profile={chat_f} /> */}

</div> 

{/* )} */}

      </div>
        )
        }
    </div>
  );
}


