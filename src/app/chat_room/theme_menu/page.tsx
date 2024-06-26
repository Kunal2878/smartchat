'use client'
import React from 'react'
import Image from 'next/image'
import  {UseAppContext}  from '../../index'
function Theme_menu() {
    
  const context = UseAppContext();
  const { setIsThemeMenu,setChatTheme} = context || {};
    const chat_themes=[
        {img:"/chatbg.jpg", text:"Theme 1 (default)"},
        {img:"/chatbg_2.jpg", text:"Theme 2"},
        {img:"/chatbg_3.jpg", text:"Theme 3"},
        {img:"/chatbg_4.jpg", text:"Theme 4"},
        {img:"/chatbg_5.jpg", text:"Theme 5"},
        {img:"/chatbg_6.jpg", text:"Theme 6"},
        {img:"/chatbg_7.jpg", text:"Theme 7"},
        {img:"/chatbg_8.jpg", text:"Theme 8"},
        {img:"/chatbg_9.jpg", text:"Theme 9"},
        {img:"/chatbg_10.jpg",text:"Theme 10"},
        {img:"/chatbg_11.jpg",text:"Theme 11"},
        {img:"/chatbg_12.jpg",text:"Theme 12"},
        {img:"/chatbg_13.jpg",text:"Theme 13"},
        {img:"/chatbg_14.jpg",text:"Theme 14"},
      
    ]
// const chat_bar_themes=[
//     {bg:"bg-gradient-to-r from-gray-900  to-purple-600",color:"",text:"Theme 1"},
//     {bg:"bg-gradient-to-r from-gray-900  to-red-600",color:"",text:"Theme 2"},
//     {bg:"bg-gradient-to-r from-gray-900  to-blue-600",color:"",text:"Theme 3"},
//     {bg:"bg-gradient-to-r from-gray-900  to-indigo-600",color:"",text:"Theme 4"},
//     {bg:"bg-gradient-to-r from-white  to-purple-600",color:"",text:"Theme 5"},
//     {bg:"bg-gradient-to-r from-white  to-red-600",color:"",text:"Theme 6"},
//     {bg:"bg-gradient-to-r from-white  to-indigo-600",color:"",text:"Theme 7"},
//     {bg:"bg-gradient-to-r from-white  to-blue-600",color:"",text:"Theme 8"},

  
// ]
  return (
    <div className='w-[300px] h-80 flex flex-col items-center overflow-y-scroll'>
    <div className='p-2 w-full sticky top-0 flex flex-row justify-between items-center text-white dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400'>
      <span className='w-[100px] '>Chat Themes</span>
      <span className='w-[60px] cursor-pointer'>

        <Image
        width={10}
        height={10}
        src={'/wrong.svg'}
        alt='loading...'
        className='size-6 rounded-full'
        onClick={()=> setIsThemeMenu?.(false)}
        />
      </span>
      </div>
    <div className=' cursor-pointer w-full flex flex-col items-center pt-2 dark:bg-gray-900 bg-white text-gray-900 dark:text-white'>
         {
        chat_themes.map((itr,index)=>(
<div key={index} className='hover:bg-purple-400 w-full h-8 flex flex-row items-center p-2 mb-4'
onClick={()=> setChatTheme?.(itr.img)}
>
<Image
unoptimized={true}
src={itr.img}
width={10}
height={10}
alt='loading...'
className='size-6 rounded-full'
/>
<span className="flex flex-row justify-center items-center w-[220px]   "   >{itr.text}</span>
</div>
        ))
      }

      {/* {
        chat_bar_themes.map((itr,index)=>(
<div key={index} className=' w-full h-8 flex flex-row items-center p-2 mb-4 cursor-pointer hover:bg-purple-400'>
<div

className={`size-6 rounded-full ${itr.bg}`}
/>
<span className={` flex flex-row justify-center items-center w-[120px] `}   >{itr.text}</span>
</div>
        ))
      } */}


</div>
    </div>
  )
}

export default Theme_menu
