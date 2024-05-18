import Signup from "./Components/Signup"
import AuthForm from "./Components/Login"
import Chat_msg from "./client/chat_page_handler/page"
import Chat_server from "./server_runner/page"

import TopBar from "./Chat_room_components/top_bar"

import Navbar from "./navbar"
import Landing_page from "./Home_components/landing_page"

import Invite from "./Chat_room_components/invite/page"
// import Notification from "./Chat_room_components/notification/page"

import Loader from "./loader"
export default async function Home() {
 
return (
    <main className="m-0 flex min-h-screen flex-col items-center justify-between " >
      {/* <Signup/> */}
      {/* <AuthForm/> */}
      {/* <Chat_profiles/> */}
      {/* <RoomTemp/> */}
      {/* <Navbar/> */}
      <Landing_page/>
      {/* <Invite/> */}
      {/* <Notification/> */}
 

      {/* <Content/> */}
      {/* <Chat_msg/> */}
      {/* <Chat_server/> */}
    
    </main>
  )
}
