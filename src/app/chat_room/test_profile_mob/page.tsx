'use client'
import * as React from 'react'
import Image from 'next/image'
import Pusher from 'pusher-js';
import  {UseAppContext}  from '../../index'
import test from 'node:test';

function Chat_profile_mob() {
    const [profiles, setProfiles] = React.useState<any[]>([])

    const context = UseAppContext();
    const { avatar, isThemeMenu, setIsThemeMenu, testRoom, testName, testAvatar} = context || {};



    return (
        <div className='w-full h-16 -z-2  flex flex-col dark:bg-gray-900 dark:text-white text-gray-900 bg-white mb-2'>
        
                <div className='w-full h-full flex flex-row justify-between p-2 mb-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400'>
                    <div className=' text-white w-1/4 ml-1'>Smartchat</div>
                    <div className=' text-white w-1/4 text-[16px] flex flex-row justify-end '>{testRoom}</div>
                    <div className="w-2/4 flex flex-row justify-end mr-2">
                        <div className='size-8 flex justify-start rounded-full dark:bg-dots-dark bg-dots-light mr-2 ' onClick={() => { isThemeMenu ? setIsThemeMenu?.(false) : setIsThemeMenu?.(true) }}></div>
                        <div className=" size-8">
                            <Image
                                src={testAvatar || ''}
                                width={42}
                                height={42}
                                alt="Picture of the author"
                                className='size-full rounded-full object-cover'
                            />
                        </div>
                    </div>
                </div>
             
        
        </div>
    )
}

export default Chat_profile_mob
