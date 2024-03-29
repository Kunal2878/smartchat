
import { createServer } from "http";
import { Server } from "socket.io";

export default async function Chat(){
console.log("hahjsj")
  // const httpServer = createServer();
  const io = new Server( {
    cors:{
      origin:"*",
      methods:["GET","POST"]
    }
  });
  
  io.on("connection", (socket) => {
  console.log(socket.id,"low")
  });
  
  // httpServer.listen(5000,()=>{
  //   console.log("Server running")
  // });
}