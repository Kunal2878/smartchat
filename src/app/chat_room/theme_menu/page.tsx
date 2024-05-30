import React from 'react'
import Image from 'next/image'
function Theme_menu() {
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
const chat_bar_themes=[
    {bg:"bg-gradient-to-r from-gray-900  to-purple-600",color:"",text:"Theme 1"},
    {bg:"bg-gradient-to-r from-gray-900  to-red-600",color:"",text:"Theme 2"},
    {bg:"bg-gradient-to-r from-gray-900  to-blue-600",color:"",text:"Theme 3"},
    {bg:"bg-gradient-to-r from-gray-900  to-indigo-600",color:"",text:"Theme 4"},
    {bg:"bg-gradient-to-r from-white  to-purple-600",color:"",text:"Theme 5"},
    {bg:"bg-gradient-to-r from-white  to-red-600",color:"",text:"Theme 6"},
    {bg:"bg-gradient-to-r from-white  to-indigo-600",color:"",text:"Theme 7"},
    {bg:"bg-gradient-to-r from-white  to-blue-600",color:"",text:"Theme 8"},

  
]
  return (
    <div className='w-full h-auto flex flex-col items-center dark:bg-gray-900 bg-white text-gray-900 dark:text-white'>
      {
        chat_themes.map((itr)=>(
<div className='w-full h-6 flex flex-row items-center hover:scale-50 transition-all p-4 mb-4'>
<Image
unoptimized={true}
src={itr.img}
width={10}
height={10}
alt='loading...'
className='size-6 rounded-full'
/>
<span className="flex flex-row justify-center items-center h-full"  style={{ width: `calc(calc(100vw - ${2 * 16}px) - 24px)` }} >{itr.text}</span>
</div>
        ))
      }
      {
        chat_bar_themes.map((itr)=>(
<div className='w-full h-6 flex flex-row items-center hover:scale-50 transition-all p-2 mb-4'>
<div

className={`size-6 rounded-full ${itr.bg}`}
/>
<span className={`w-calc-[calc(calc(100vw - ${2 * 16}px) - ${24}px)] flex flex-row justify-center items-center h-full bg-slate-600`}  style={{ width: `calc(calc(100vw - ${2 * 16}px) - 24px)` }} >{itr.text}</span>
</div>
        ))
      }



    </div>
  )
}

export default Theme_menu
