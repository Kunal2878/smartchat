import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <div className='w-full flex flex-col p-2'>
      <div className='w-full flex flex-row justify-between'>
        <div className='w-full md:w-4/5 flex flex-row items-center'></div>
        <div className='w-full'>Quick Links
        <ul>Chat Room</ul>
        <ul>About Us</ul>
        <ul>Contact Us</ul>
        <ul>Privacy Policy</ul>

        </div>
        <div className='w-full'>API Integrations 
        <ul>Supabase</ul>
        <ul>MongoDB</ul>
        <ul>Google APIs</ul>
        </div>
<div className='w-full'>Useful Websites </div>
<div className=' w-full md:hidden flex justify-center items-center'>
<input className=' w-full outline-none rounded-md' placeholder='send feedback....' />
<button className='bg-orange-500 rounded-sm'>
<Image
width={10}
height={10}
src={"/send_icon.png"}
className='size-20'
alt='Loading....'
/>
</button>
</div>

<div className='w-1/3 flex flex-row justify-center'>

<Image
width={10}
height={10}
src={"/web_logo.png"}
className='size-20 md:size-40'
alt='Loading....'
/>
<p>SmartChat</p>
        </div>
<input className='hidden md:block w-1/3 outline-none rounded-md' placeholder='send feedback....' />
        <p className='text-gray-600'>@copywright All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
