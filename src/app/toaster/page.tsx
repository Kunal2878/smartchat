import React from 'react'
import Image from 'next/image'
function Toaster({message,icon}:any) {
  return (
    <div className="w-full  flex flex-row justify-center items-center p-3 transition ease-in delay-200 duration-1000">
      <div className="w-full md:w-2/5 h-40 flex  flex-col  justify-center items-center rounded-md dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black bg-gradient-to-r from-white via-gray-600 to-black dark:text-gray-900 bg-gray-900 text-white">
        <div className="mb-2  w-full flex flex-row justify-center items-center md:w-4/5 rounded-lg">
          <Image
          width={10}
          height={10}
          src={icon}
          alt="loading..."
          className='size-28'
          
          />
        </div>
        <div className="w-full text-base flex flex-row justify-center items-center text-white">
        {message}
        </div>
      </div>
    </div>
  )
}

export default Toaster
