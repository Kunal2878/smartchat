"use client"
import * as React from 'react'
import  {UseAppContext}  from '../index'
function Chat_content() {
  const context = UseAppContext();
  const { setF_chat,f_chat } = context || {};
  return (
    <div className=' dark:text-white text-gray-900 parent w-full flex flex-col h-full 'style={{ backgroundImage: `url(/chatbg.jpg)`,backgroundPosition:"center", backgroundRepeat:"no-repeat" , backgroundSize:"cover"}}>
     <div className='w-full flex flex-col flex-grow h-5/6 overflow-hidden hover:overflow-y-auto'>
<li>chat</li>

     </div>
     
      <div className=' search w-full flex justify-center items-center  lg:h-16 mb-0 dark:bg-gray-900 bg-white '>
        <input type= "text" className='rounded-md dark:bg-white bg-gray-900 dark:text-gray-900 text-white outline-none' placeholder='Message....'/>
      </div>
    </div>
  )
}

export default Chat_content
