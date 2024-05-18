import React from 'react'
import Image from 'next/image'
function Body_com() {
const show=[
    {img:"chat_img_1.png",text:"Effortless Communication",des:"Our platform is intuitive for smooth and enjoyable conversations"},
    {img:"chat_img_2.png",text:"Secure Sign-In", des:"Your privacy matters. We offer secure login options to keep your chats safe"},
    {img:"chat_img_3.png",text:"Login Your Way", des:"Choose your comfort. Login with social media, fingerprint, or password - it's up to you"},
    {img:"chat_img_4.png",text:"Stay Connected, Simplified", des:"Choose your comfort. Login with social media, fingerprint, or password - it's up to you"},
]


  return (

<div className='w-full flex flex-row justify-center items-center '>
  <div className=' w-full h-auto pt-4 pb-6 md:p-4 grid md:grid-cols-2 grid-cols-1 dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-tr from-purple-200 via-purple-100 to-white text-gray-900 dark:text-white' style={{zIndex:-40}}>





   
        {
show.map((itr)=>(

      <div className=' w-full flex  flex-col justify-center items-center gap-2 '>
<div className='w-full md:w-1/2 flex flex-row justify-center items-center md:mt-1 mt-3 aspect-h-3 aspect-w-4 ' >
<Image
width={20}
height={20}
src={itr.img}
alt="loading...."
className='md:size-60 size-60'

/>

</div>

{/* Animation */}
<div className="w-60 h-2 flex flex-row justify-start "> <div className=" relative w-[40px] h-[4px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600   transition duration-300 alternate animate-showLine line-animation">  </div></div>


<div className='w-full md:w-3/5 flex flex-col justify-center items-center align-middle'>
      <span className='w-full flex flex-row justify-center font-black  bg-clip-text text-transparent  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-[18px] mb-4'>{itr.text}</span> 
<div className='md:w-full w-4/5  flex flex-row justify-center items-center dark:text-gray-400 text-red-800 text-[12px] '>{itr.des}</div>
             </div>

      </div>
))
        }
  
    </div>
    </div>

  )
}
export default Body_com
