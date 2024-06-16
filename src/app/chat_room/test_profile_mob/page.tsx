'use client'
import * as React from 'react'
import Image from 'next/image'
import Pusher from 'pusher-js';
import  {UseAppContext}  from '../../index'
import test from 'node:test';

function Chat_profile_mob() {
    const [profiles, setProfiles] = React.useState<any[]>([])
    const [profiles2, setProfiles2] = React.useState<any[]>([])
    const existingNames = new Set();
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const context = UseAppContext();
    const { avatar, isThemeMenu, setIsThemeMenu, testRoom, testName, testAvatar} = context || {};

    React.useEffect(() => {
        console.log('testroom', testRoom)
        const channel = pusher.subscribe(`${testRoom}`);
        channel.bind('new-message', (data: any) => {  
            setProfiles2(prevProfiles2 => [...prevProfiles2, data]);      
            setProfile(data)
       
        })
            // return () => channel.unsubscribe();
            
    }, []);
function setProfile(data:any)
{
    console.log("inside function")
console.log("Data",data)

    data.map((itr: any) => {
console.log("inside if ",itr.room,itr.sender)
        if (itr.room === testRoom && itr.sender !== testName && !existingNames.has(itr.sender)) {
            console.log("entered")
            setProfiles((prev: any) => [...prev, { testName: itr.sender, avatar: itr.avatar }]);
            existingNames.add(itr.sender);
        }
        setProfiles((prev: any) => [...prev, { testName: itr.sender, avatar: itr.avatar }]);
        existingNames.add(itr.sender);
   

console.log(profiles)
console.log(existingNames)


})
}

    return (
        <div className='w-full h-36  -z-2  flex flex-col dark:bg-gray-900 dark:text-white text-gray-900 bg-white mb-2'>
            <div className="w-full h-full">
                <div className='w-full flex flex-row justify-between p-2 mb-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400'>
                    <div className=' text-white w-1/4'>Smartchat</div>
                    <div className=' text-white w-1/4 text-[16px] flex flex-row justify-center items-center'>{testRoom}</div>
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
                <div className='w-full flex flex-col'>
                    <span className='w-full flex flex-row justify-start pl-2 text-[16px]'>Others</span>

                    <div className='w-11/12 flex flex-row pl-2 overflow-hidden overflow-x-auto'>
                    <div  className='w-1/4 flex flex-col items-center'>
                                <div className="add size-10 flex flex-row justify-center rounded-full bg-slate-400">
                                    <Image
                                        unoptimized={true}
                                        src={testAvatar||''}
                                        width={42}
                                        height={42}
                                        alt="Picture of the author"
                                        className='size-full object-cover rounded-full'
                               
                                    />
                                </div>
                                <div
                                    className="w-full flex flex-row justify-center text-[10px] mt-2 truncate"
                                >You</div>
                            </div>

                        {profiles?.map((profile: any,index) => (
                            <div key={index} className='w-1/4 flex flex-col items-center'>
                                <div className="add size-10 flex flex-row justify-center rounded-full bg-slate-400">
                                    <Image
                                        unoptimized={true}
                                        src={profile.avatar}
                                        width={42}
                                        height={42}
                                        alt="Picture of the author"
                                        className='size-full object-cover rounded-full'
                                    />
                                </div>
                                <div
                                    className="w-full flex flex-row justify-center text-[10px] mt-2 truncate"
                                >{profile.testName}</div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='w-1/12 mr-3'>
                        <div className=" size-10 flex justify-start rounded-full bg-slate-400">
                            <Image
                                src="/plus_icon.svg"
                                width={42}
                                height={42}
                                alt="Picture of the author"
                                className='size-full rounded-full object-cover cursor-pointer'
                                onClick={() => setIsInvite && setIsInvite(true)}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Chat_profile_mob
