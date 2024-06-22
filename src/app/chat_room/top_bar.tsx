'use client'

import React from 'react'
import Image from 'next/image'
import  {UseAppContext}  from '../index'
function TopBar() {
  const context = UseAppContext();
  const { setIsThemeMenu,room, isThemeMenu,avatar,userName} = context || {};
  return (
    <div className="w-full  flex justify-between dark:bg-gray-900 dark:text-white text-gray-900 bg-white ">
      <div className="w-full flex flex-col">
        <div className="w-full pl-4 flex flex-row justify-start">
          <div className="w-1/2 flex flex-row justify-center items-center">
            <div className="size-8 mt-1 flex flex-row justify-center rounded-full bg-slate-400">
              <Image
                unoptimized={true}
                src="/brand.svg"
                width={40}
                height={40}
                alt="Picture of the author"
                className="size-full "
              />
            </div>
            <span className=' w-3/4 text-[14px] text-white flex flex-row justify-center items-center font-[400]  truncate '>{userName}</span>

          </div>

          <div className='w-1/2 flex flex-row justify-between items-center'>


          <div className=" size-8">
                <Image
                  unoptimized={true}
                  src={'/home.svg'}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full object-cover'
                />
              </div>
      <div className=" cursor-pointer size-8 ">
                <Image
                  unoptimized={true}
                  src={'/bell.svg'}
                  width={42}
                  height={42}
                  alt="Picture of the author"
                  className='size-full rounded-full object-cover'
                />
              </div>
          <div className={`${room===''?'hidden':'flex'} w-1/2 mr-0 flex flex-row justify-end`}>
          
          <div className='size-8 flex justify-start rounded-full dark:bg-dots-dark bg-dots-light mr-2 ' onClick={()=>{isThemeMenu ? setIsThemeMenu?.(false):setIsThemeMenu?.(true)}}></div>
          </div>
          <div className=" size-8">
                            <Image
                                src={avatar || ''}
                                width={42}
                                height={42}
                                alt="Picture of the author"
                                className='size-full rounded-full object-cover'
                            />
                        </div>
          </div>

        </div>
      
      </div>
    </div>
  );
}


export default TopBar
