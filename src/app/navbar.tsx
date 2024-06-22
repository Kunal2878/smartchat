"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import  Link  from 'next/link';
import {UseAppContext} from './index'
function Navbar() {
  const context = UseAppContext();
  const {

    avatar,
    setAvatar,
    isSession,
  } = context || {};
  let [wdth, setWdth] = useState<number>(0);
  if (isSession) {
    if (avatar === undefined) {
      setAvatar?.("solid_user.svg");
    }
  }
  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 640;
    if (isLargeScreen) {
      setWdth(80);
    } else {
      setWdth(60);
    }
  }, [wdth]);
  return (
    <div className="z-20 w-full flex flex-row justify-center md:justify-start">
      <div className="w-4/5 md:w-full flex flex-row justify-center items-center dark:bg-gray-900 dark:tect-white bg-white text-gray-900 md:p-2 border-b-2 rounded-full md:rounded-none border-cyan-300 md:mb-0 mb-3 fixed bottom-0">
        <div className="w-2/5 md:w-1/4 flex flex-row justify-between  md:justify-between items-center md:pl-3">
          <div className="size-6  md:size-6  ml-3 md:ml-0 md:mr-4">
            <Link href="/">
              <Image
                width={wdth}
                height={wdth}
                src="home.svg"
                className="h-full w-full"
                alt="Picture of the author"
              />
            </Link>
          </div>
          <div className="size-6  md:size-6 md:mr-4">
            <Link href="/about">
              <Image
                width={wdth}
                height={wdth}
                src="about.svg"
                className="h-full w-full object-cover"
                alt="Picture of the author"
              />
            </Link>
          </div>
        </div>
        <div className="w-1/5 md:w-1/2 flex justify-center md:justify-center items-center  mr-4 ml-4 md:ml-0 md:mr-0">
          <div className="size-12 md:size-8 flex justify-start rounded-full bg-gradient-to-r from-yellow-200 to-black ">
            {isSession?(
  <Link href="/chat_room/chat_tmp2">
  <Image
    src="/send_icon.png"
    width={10}
    height={10}
    alt="Picture of the author"
    className="w-full h-full object-cover"
  />
</Link>
            ):(

            <Link href="/middleware">
            {/* <Link href="/chat_room/chat_tmp"> */}
              <Image
                src="/send_icon.png"
                width={10}
                height={10}
                alt="Picture of the author"
                className="w-full h-full object-cover"
              />
            </Link>
            )}
          </div>
        </div>
        <div className="w-2/5 md:w-1/4 flex justify-between md:justify-between items-center md:pr-3">
          <div className="size-6 mr-4 md:size-6 md:mr-4">
            <Link href="/contact">
              <Image
                width={wdth}
                height={wdth}
                src="contact_us.svg"
                className="h-full w-full object-cover"
                alt="Picture of the author"
              />
            </Link>
          </div>
          <div className="add size-6 md:size-6 flex  rounded-full bg-slate-400 mr-3 md:mr-0">
            <Link href="/">
              <Image
                src={avatar||""}
                width={wdth}
                height={wdth}
                className="size-full object-cover rounded-full"
                alt={avatar||""}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar
