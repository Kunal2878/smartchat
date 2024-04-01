"use client"
import  {UseAppContext}  from '../index'
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Mob_sidebar({ IsSession }: { IsSession: boolean | undefined }) {
  const context = UseAppContext();
  const {  setIsLoading } =context || {};
  const theme3 = [
    { icon: "smile.svg", text: "Jokes" },
    { icon: "trend.svg", text: "Trending" },
    { icon: "art.svg", text: "Stickers" },
    { icon: "bell.svg", text: "Notifications" },
  ];
  const handleLogout = async () => {
setIsLoading?.(true)
    try {
      const response = await fetch('/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
      });

      if (response.ok) {
        window.location.href = "/";
        console.log("Logout successful!");
   
      } else {
        console.error("Logout error:", response.statusText);
        // Handle logout error (optional)
      }
    } catch (error) {
      console.error("Error during logout:", error);

    } finally {
   
    }
  };

  return (
    <div className="w-full">
      <div className="w-2/5 p-2 absolute right-0 mr-4 flex flex-col items-center dark:bg-gray-900 dark:text-white bg-white text-gray-900 text-sm">
        {theme3.map((itr) => (
          <button
            className="w-full flex flex-row hover:bg-violet-500 p-2"
            key={itr.icon}
          >
            <Image
              width={20}
              height={20}
              src={itr.icon}
              alt="Loading...."
              className=" mr-2"
            />
            <span>{itr.text}</span>
          </button>
        ))}

        <div className="w-full flex flex-row justify-center items-center">
          {IsSession ? (
            // <form action="/auth/signout" method="post" onSubmit={handleSubmit}>
              <button
                className="w-20 h-8 text-white rounded-lg bg-violet-800 text-[10px] hover:bg-violet-500"
                type="submit" onClick={handleLogout}
              >
                Log out
              </button>
            // </form>
          ) : (
            <Link href="/auth/signup">
              <button
                className="w-20 h-8 text-white rounded-lg bg-violet-800 text-[10px] hover:bg-violet-500"
                type="submit"
              >
                Login/Signup
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mob_sidebar
