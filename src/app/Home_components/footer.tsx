import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Ql=[{img:"chat_icon.svg",text:"Chat Room",link:""},{img:"about_info.svg",text:"About Us",link:"/about"},{img:"contact_us_stroke.svg",text:"Contact Us",link:"/contact"},{img:"privacy.svg",text:"Privacy Policy",link:"/privacy"},{img:"terms.svg",text:"Terms and Conditions",link:"/terms"}]
const api=[{img:"supabase.svg",text:"Supabase",link:""},{img:"g_apis.svg",text:"Google APIs",link:""}]
const social=[{img:"facebook.svg"},{img:"instagram.svg"},{img:"linked_in.svg"}]
function Footer() {
  return (
    <div className='w-full flex flex-col  p-6 pb-16 dark:bg-gray-900 dark:text-white text-gray-900 bg-white'>
      <div className='w-full flex flex-row justify-between '>
        <div className='w-1/3 md:w-1/4 flex flex-col   '>
          <span className="w-full font-black text-[12px] md:text-[18px] flex flex-row justify-start border-2 border-white dark:border-gray-900 border-b-red-600 dark:border-b-indigo-600 pb-2">Quick Links</span>
       <div className='w-full flex flex-col p-2 pl-4'>
{
  Ql.map((itr)=>(
<>
<Link href={itr.link} className='w-full flex flex-row justify-start mt-2'>
<div className='size-4 md:size-5 flex flex-row justify-center items-center mr-4'>
<Image
width={20}
height={20}
src={itr.img}
alt="loading...."
className='size-full'

/>
</div>
<span className='w-full md:w-3/4 flex flex-row justify-start items-center md:text-[16px] text-[10px] dark:hover:text-cyan-600 hover:text-red-600'>{itr.text}</span>

</Link>
</>
  ))
}
       </div>

        </div>
        <div className='w-1/3 md:w-1/4 flex flex-col   '>
          <span className="w-full font-black text-[12px] md:text-[18px] flex flex-row justify-start border-2 border-white dark:border-gray-900 border-b-red-600 dark:border-b-indigo-600 pb-2">API Integrations</span>
          <div className='w-full flex flex-col p-2'>
{
  api.map((itr)=>(
<>
<Link href={itr.link} className='w-full flex flex-row justify-start mt-2'>
<div className='size-4 md:size-5 flex flex-row justify-center items-center mr-4'>
<Image
width={20}
height={20}
src={itr.img}
alt="loading...."
className='size-full'

/>
</div>
<span className='w-full md:w-3/4 flex flex-row justify-start items-center md:text-[16px] text-[10px] dark:hover:text-cyan-600 hover:text-red-600'>{itr.text}</span>

</Link>
</>
  ))
}
 </div>
 </div>

 <div className='w-1/3 md:w-1/4 flex flex-col   '>
          <span className="w-full font-black text-[12px] md:text-[18px] flex flex-row justify-start border-2 border-white dark:border-gray-900 border-b-red-600 dark:border-b-indigo-600 pb-2">My  Websites</span>
      
<div className='w-full flex flex-col p-2'>
<Link href="/" className="w-full flex flex-row justify-start mt-2">


<div className='size-4 md:size-5 flex flex-row justify-center items-center mr-4'>
<Image
width={20}
height={20}
src="favicon.png"
alt="loading...."
className='size-full'

/>
</div>


<span className='w-full flex flex-row justify-start items-center md:text-[16px] text-[10px] dark:hover:text-cyan-600 hover:text-red-600'>Movflix</span>

</Link>
</div>
</div>
</div>



<div className=' w-full flex flex-row justify-center items-center mb-4'>
<input className=' md:w-2/5 w-4/5 mr-2 dark:bg-white bg-gray-900 outline-none rounded-md' placeholder='send feedback....' />
<button className='size-8 bg-orange-500 rounded-full'>
<Image
width={10}
height={10}
src={"/send_icon.png"}
className='size-full object-cover rounded-full'
alt='Loading....'
/>
</button>
</div>



       <div className='w-full flex flex-row jsutify-between mb-6'>
        <p className='w-1/2 dark:text-gray-500 text-gray-700  md:text-[12px] text-[8px]'>@copywright All rights reserved</p>
        <div className='w-1/2 flex flex-row justify-end'>
        {
          social.map((itr)=>(
            <div className='size-8  flex flex-row justify-center items-center mr-4 rounded-full border-2 border-purple-600 dark:hover:border-cyan-500 hover:border-red-500'>
<Image
width={20}
height={20}
src={itr.img}
alt="loading...."
className='size-4'

/>
</div>
          ))
        }
        </div>
        </div> 
    </div>
  )
}

export default Footer
