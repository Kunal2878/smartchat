import Signup from "./Components/Signup"
import LandingPage from "./Components/LandingPage/Page"
import AuthForm from "./Components/Login"
import Chat_msg from "./client/chat_page_handler/page"
import Chat_server from "./server_runner/page"
import Chat_profiles from "./chat_room/chat_profiles"
export default async function Home() {
 
return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <Signup/> */}
      {/* <AuthForm/> */}
      <Chat_profiles/>
      {/* <Chat_msg/> */}
      {/* <Chat_server/> */}
      {/* <LandingPage/> */}
    </main>
  )
}
