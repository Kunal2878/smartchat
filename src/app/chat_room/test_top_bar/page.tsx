'use client'

import React from 'react'
import Image from 'next/image'
import  {UseAppContext}  from '../../index'
import Link from 'next/link';
function TopBar() {
  const context = UseAppContext();
  const { setIsThemeMenu,testAvatar} = context || {};
  return (
    <div className=" static pt-4 text-gray-900  dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-tr from-purple-200 via-purple-100 to-white dark:text-white w-full h-full flex flex-col items-center  ">

           
            <div className="size-8  rounded-full bg-slate-400 mb-6">
              <Image
                unoptimized={true}
                src="/brand.svg"
                width={40}
                height={40}
                alt="Picture of the author"
                className='size-full'
              />
            </div>
            <Link href="/" className="size-8  rounded-full mb-6">
              <Image
                unoptimized={true}
                src="/home.svg"
                width={40}
                height={40}
                alt="Picture of the author"
                className='size-full'
              />
            </Link>
        
 
            <div className="size-8  cursor-pointer mb-6 rounded-full bg-slate-400 ">
           
              <Image
                unoptimized={true}
                src="/star.svg"
                width={20}
                height={20}
                alt="Picture of the author"
                onClick={()=> setIsThemeMenu?.(true)}
                className='size-full'
              />
       
          </div>
            <div className=" absolute bottom-0 bg-slate-400 size-8 rounded-full cursor-pointer mb-6">
           
              <Image
                unoptimized={true}
                src={testAvatar|| ''}
                width={20}
                height={20}
                alt="Picture of the author"
                onClick={()=> setIsThemeMenu?.(true)}
                className='size-full rounded-full'
              />
       
          </div>
        </div>
      

    
  );
}


export default TopBar
