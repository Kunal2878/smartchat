"use client"
import Loader from '../loader'
import Home_beg from './home_beg'
import Home_rest_com from './home_rest_com'
import Feed from './feed'
import Navbar from '../navbar'
import Notification from '../Chat_room_components/notification/page'
import Invite from '../Chat_room_components/invite/page'
import * as React from "react";
import  {UseAppContext}  from '../index'
import { cookies } from 'next/headers'
import { Database,Friend_list } from '../types/database.types'
import { Session, createClientComponentClient,createServerComponentClient} from '@supabase/auth-helpers-nextjs'
type Invite = Database['public']['Tables']['Invite']['Row']
export default   function All_components({ Email,pic,username,sessionCheck,Id,session } : { Email: string|undefined,pic:string|undefined,username:string|undefined,sessionCheck:boolean ,Id:any|undefined,session:Session| null}) 

{
  const [invites, setInvites] = React.useState<Invite[]>([]);
  const [coinvites, setCoInvites] = React.useState<Invite[]>([]);
  const [f_list, setFlist] = React.useState<Friend_list[]>([]);

  const user=session?.user
  const supabase = createClientComponentClient<Database>(
    {supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL
    }
  )
  const context = UseAppContext();
  const {  isLoading, setIsLoading, email, setEmail,avatar,setAvatar,isSession, setIsSession,setId,userName,setUserName } = context || {};



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
        .select("sender, receiver, sender_name, isDone, created_at, avatar_url")
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
      .order("created_at", { ascending: false });
      if (data) {
      console.log("data",data)
      const flist = data.map((itr) => ({
        f_name: itr.rec_username,
        f_mail: itr.receiver,
        f_avatar: itr.rec_avatar,
      }));
      setFlist([...flist]);
    } else {
      console.error("Error fetching invites:", error);

    }
  } catch (error) {
    console.error("Unexpected error:", error);

  } finally {
    // setIsLoading(false);
  }
  console.log(f_list);
};

React.useEffect(() => {
  fetchSendConfirmInvites();
},[email])


// const fetchRecConfirmInvites = async () => {


//   try {
//     const { data, error } = await supabase
//       .from("Invite")
//       .select("sender, receiver, sender_name, avatar_url")
//       .eq("receiver", email)
//       .eq("isDone",true)
//       .order("created_at", { ascending: false });

//     if (!error) {
//       // console.log(data)
//       const flist = data.map((itr) => ({
//         f_name: itr.sender_name,
//         f_mail: itr.sender,
//         f_avatar: itr.avatar_url,
//       }));
//       setFlist([...flist]);
//     } else {
//       console.error("Error fetching invites:", error);
//       // Handle error gracefully (e.g., display an error message)
//     }
//   } catch (error) {
//     console.error("Unexpected error:", error);

//   } finally {
//     // setIsLoading(false);
//   }
//   // console.log(invites);
// };

// React.useEffect(() => {
//   fetchRecConfirmInvites();
// },[email])





const uniqueFlist = React.useMemo(() => {
  const seen = new Set();
  
  const uniqueArrays = f_list.filter((arr) => {
    const allUnique = !seen.has(arr);
    seen.add(arr);
    return allUnique;
  });
  
  return uniqueArrays;
}, [f_list]);

React.useEffect(()=>{
setFlist(uniqueFlist)
},[f_list])




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
        <Feed />
        <Navbar />
        <Invite/>
       {(invites.length>=0 ||f_list.length>=0)&&(

         <div className=""><Notification invites={invites} f_list={f_list}/></div>
       )
       }
      </div>
        )
        }
    </div>
  );
}


