import * as React from 'react'

function Chat_content() {
  return (
    <div className=' parent w-full flex flex-col h-full bg-red-500'>
     <div className='w-full flex flex-col flex-grow h-5/6 overflow-hidden hover:overflow-y-auto'>
<li>chat</li>

     </div>
      <div className=' search w-full flex justify-center items-center  tb:h-12 mb-0 bg-zinc-500'>
        <input type= "text" className='rounded-md text-gray-600 outline-none' placeholder='Message....'/>
      </div>
    </div>
  )
}

export default Chat_content
