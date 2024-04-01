import React from 'react'
import Image from 'next/image'
function Art() {
    const info=[
        {id:1, ico: "/signup1.png",txt:"News feed"},
         { id:2, ico: "/signup1.png",txt:"Stories"}, 
         {id:3, ico:"/signup1.png", txt:"Quotes"},
         {id:4, ico:"/signup1.png", txt:"Arts"},
       ]
  return (
    <div className='w-full flex flex-row items-center'>
        {info.map((itr) =>(

      <div key={itr.id} className='w-1/3 md:w-1/4 aspect-w-16 aspect-h-5'>
<Image
width={10}
height={10}
src={itr.ico}
alt={"Loading...."}
className='w-full h-20 md:h-28 object-cover'
/>
      </div>
        ))}
    </div>
  )
}

export default Art
