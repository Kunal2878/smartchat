// 'use-client'
import React from 'react'
import Image from 'next/image'
function TopBar() {
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
            <h2 className="w-1/5 flex justify-center items-center text-white md:ml-2 pr-2">
              SmartChat
            </h2>
          </div>
          <div className="w-1/2 mr-0 flex flex-row justify-end">
            <div className="pl-2 w-1/2 flex justify-end pr-4">
              {/* <Image
                src="sun.svg"
                width={20}
                height={20}
                alt="Picture of the author"
              />
              <Image
                src="sun.svg"
                width={20}
                height={20}
                alt="Picture of the author"
              />
              <Image
                src="sun.svg"
                width={20}
                height={20}
                alt="Picture of the author"
              />

              <Image
                src="search.svg"
                width={20}
                height={20}
                alt="Picture of the author"
              /> */}
              <Image
                src="/dots_vertical.svg"
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center p-2">
          <input
            className="w-4/5 bg-slate-200 rounded-md border-red-400 mr-2"
            type="text"
          />
          <Image
          unoptimized={true}
            src="/search.svg"
            width={20}
            height={20}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
}


export default TopBar
