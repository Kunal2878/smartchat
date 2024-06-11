import Chat_msg from "./api/socket_client/client"
import Chat_server from "./server_runner/page"
import Theme_menu from './chat_room/theme_menu/page'
import TopBar from "./Chat_room_components/top_bar"
// import Show_chat from "./api/socket_server/page"
import Navbar from "./navbar"
import Landing_page from "./Home_components/landing_page"

import Invite from "./Chat_room_components/invite/page"
// import Notification from "./Chat_room_components/notification/page"

import Loader from "./loader"
export default function Home() {
  return (
    <main className="m-0 flex min-h-screen flex-col items-center justify-between ">
      {/* <Show_chat /> */}
      {/* <Chat_msg /> */}
      <Landing_page />
    </main>
  );
}
