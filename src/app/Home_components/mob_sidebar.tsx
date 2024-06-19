"use client"
import  {UseAppContext}  from '../index'
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Mob_sidebar({ IsSession }: { IsSession: boolean | undefined }) {
  const context = UseAppContext();
  const {  setIsLogin,setIsLoading,isNotify,setIsNotify,isSession } =context || {};
  const theme3 = [
    { icon: 'smile.svg', text:"Jokes",path:"/content/joke_content" },
    { icon: 'trend.svg',text:"Trending",path:"/content/trend_content"},
    { icon: 'art.svg',text:"Stickers",path:"/content/meme_content" },
    { icon: 'bell.svg',text:"Notifications",path:"/chat_room/notification" }
  ];
  const handlePath = async (path:string) => {
    if(path==="notifications"){
      setIsNotify?.(true);
    }
    else{
      setIsLoading?.(true);
      try {
        const response = await fetch(path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, 
        });
        if (response.ok) {
          window.location.href = path;
          setIsLoading?.(false);
        } else {
          console.error("Logout error:", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      } 
    }
  };

  return (
    <div className="w-full">
      <div className="w-2/5 p-2 absolute right-0 mr-4 flex flex-col items-center dark:bg-gray-900 dark:text-white bg-white text-gray-900 text-sm">
        {theme3.map((itr,index) => (
          
          // itr.path !== 'notification' ? 
          
          (
            <Link
            key={index}
              href={itr.path}
              className="w-full flex flex-row hover:bg-violet-500 p-2"
          
            >
              <Image
                width={20}
                height={20}
                src={itr.icon}
                alt="Loading...."
                className=" mr-2"
              />
              <span>{itr.text}</span>
            </Link>
          ) 
          
          // : (
          //   <div onClick={() => handlePath(itr.path)} className="w-full flex flex-row hover:bg-violet-500 p-2 cursor-pointer
          
          //   "
          //   key={index}>
              
          //     <Image
          //       width={20}
          //       height={20}
          //       src={itr.icon}
          //       alt="Loading...."
          //       className=" mr-2"
          //     />
          //     <span>{itr.text}</span>
          //   </div>
          // )
        ))}

        <div className="w-full flex flex-row justify-center items-center">
          {IsSession ? (
            <Link href="/auth/signout">
              <button
                type="button"
                className="w-20 h-8 text-white rounded-lg bg-violet-800 text-[10px] hover:bg-violet-500"
                onClick={async (e) => {
                  e.preventDefault();

                  const response = await fetch("/auth/signout", {
                    method: "POST",
                  });

                  if (response.ok) {
                    window.location.href = process.env.NEXT_PUBLIC_URL || "/";
                  } else {
                    // Handle any errors from the signout request
                  }
                }}
              >
                Log out
              </button>
            </Link>
          ) : (
            <Link
              className="w-20 h-8 flex flex-row justify-center items-center text-white rounded-lg bg-violet-800 text-[10px] hover:bg-violet-500"
              href="/middleware"
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mob_sidebar
