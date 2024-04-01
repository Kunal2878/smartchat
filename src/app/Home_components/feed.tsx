import React from 'react'
import Image from 'next/image'
function Feed() {
const info=[
 {id:1, ico: "contact_us.svg",txt:"News feed"},
  { id:2, ico: "home.svg",txt:"Stories"}, 
  {id:3, ico:"search.svg", txt:"Quotes"},
  {id:4, ico:"search.svg", txt:"Arts"},
]
  return (
    <div className='w-full h-screen z-30 dark:bg-slate-900' >
      <div className='w-full flex flex-row justify-center  '>
        {info.map((itr)=> (

        <div key= {itr.id} className='w-20 h-20 flex flex-row items-center bg-white'>
          <button className="w-full h-10 text-[8px] flex flex-col justify-center items-center m-4 bg-pink-100 rounded-md text-gray-800">
        <Image
          unoptimized={true}
          src={itr.ico}
          width={10}
          height={10}
          alt={"Loading"}
          className='w-6 h-6 object-cover flex-row justify-end items-center'
          />
        {itr.txt}
        </button>
        </div>
        ))}
   
      </div>
    </div>
  )
}

export default Feed
