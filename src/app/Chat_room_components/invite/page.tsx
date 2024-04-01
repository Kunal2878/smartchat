import * as  React from 'react'

export default function Invite() {
  return (
    <div className="w-full  flex flex-row justify-center items-center p-3">

        <div className='w-full md:w-2/5 h-40 flex  flex-col md:flex-row justify-center items-center rounded-md dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black bg-gradient-to-r from-gray-400 via-gray-900 to-white dark:text-gray-900 bg-gray-900 text-white'>
        <div className='mb-3 md:mb-0 w-full flex flex-row justify-center items-center md:w-2/5 rounded-lg'><input className=" w-4/5 outline-none rounded-[24px] p-2 dark:text-gray-900 dark:bg-white" placeholder='Enter a valid email'/></div>
      <div className='w-1/5 flex flex-row justify-center items-center'>
      <button className=' flex flex-row justify-center items-center w-16 h-8 bg-purple-800 hover:bg-purple-400 text-white text-sm rounded-md' >Invite </button>
      </div>
    </div>
    </div>
  )
}

