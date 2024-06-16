'use client'

import React from 'react'
import Image from 'next/image'
import  {UseAppContext}  from '../index'
function TopBar() {
  const context = UseAppContext();
  const { setIsThemeMenu} = context || {};
  return (
    <div className="w-full  flex justify-between dark:bg-gray-900 dark:text-white text-gray-900 bg-white ">
      <div className="w-full flex flex-col">
        <div className="w-full pl-1 flex flex-row justify-start">
          <div className="w-1/2 flex flex-row justify-between align-middle">
            <div className="w-10 h-10 mt-1 flex justify-between rounded-full bg-slate-400">
              <Image
                unoptimized={true}
                src="/brand.svg"
                width={40}
                height={40}
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className="w-1/2 mr-0 flex flex-row justify-end">
            <div className="pl-2 w-1/2 flex justify-end pr-4 cursor-pointer">
           
              <Image
                src="/star.svg"
                width={20}
                height={20}
                alt="Picture of the author"
                onClick={()=> setIsThemeMenu?.(true)}
              />
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}


export default TopBar
