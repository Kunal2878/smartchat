'use client'
import * as React from 'react'
import Link from 'next/link'
import  {UseAppContext}  from '../index'
import Image from 'next/image'
function Middleware() {


const [showInput,setShowInput]=React.useState<boolean>(false)
const [showDiv,setShowDiv]=React.useState<boolean>(true)
const [showDiv2,setShowDiv2]=React.useState<boolean>(false)
const context = UseAppContext();
const {
setTestAvatar, setTestName,setTestRoom, testAvatar,testName,testRoom
  
} = context || {};

const avatar=[{img:'/c_avt1.png'},{img:'/c_avt2.png'},{img:'/c_avt3.png'},{img:'/c_avt4.png'},{img:'/c_avt5.png'},{img:'/c_avt6.png'},{img:'/c_avt7.png'},{img:'/c_avt8.png'},]

function generateAlphabeticKey() {

  const alphabet = "abc79068&$def@ghi345&678jk7321$lmnop*qrs4357t#uvwxyz1290";
  let key = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);

    key += alphabet[randomIndex];
  }
setTestRoom?.(key)
}
  return (
    <div className='w-full h-screen md:h-auto flex flex-col items-center align-middle p-4  text-gray-900  dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-tr from-purple-200 via-purple-100 to-white dark:text-white'>


    <div className={` ${showDiv?'flex':'hidden'} w-full flex flex-col items-center  mb-8 md:mb-4`}>

      <div className='w-full md:w-1/2 flex flex-row justify-center items-center mb-6 text-[16px] md:text-[20px] font-800'>
        Get your chat saved and secure, unleash the prime features, Signup or Login to be a part of smartchat
      </div>
<Link href='/auth/signup'>
<button className='w-[100px] h-[40px] text-[11px] flex flex-row justify-center items-center text-white hover:bg-purple-400 bg-purple-700   rounded-lg mb-6'
> Signup/Login</button>
</Link>
        </div>
        <div className={` ${showDiv? 'flex' : 'hidden'} w-full flex flex-col items-center mb-8 md:mb-4`}>

      <h2 className='w-full md:w-1/2  flex flex-row justify-center items-center mb-6 text-[16px] md:text-[20px] font-800'>
        Do not want to Signup!!. It's easy to chat, generate a key below and share it with your friend...
        Remember!!! your chat will not be saved.
      </h2> 
      <button className='w-[100px] h-[40px] text-[11px] flex flex-row justify-center items-center rounded-lg  hover:bg-purple-400 bg-purple-700 text-white'
      onClick={()=> {setShowDiv(false); generateAlphabeticKey();setShowDiv2(true);setShowInput(true)}}
      > Generate a chat id </button>
    </div>

    <div className={` ${showDiv? 'flex' : 'hidden'} w-full flex flex-col items-center mb-8 md:mb-4`}>
    <h2 className='w-full flex flex-row justify-center items-center mb-6 text-[16px] md:text-[20px]'>
        Already have a key!! Click the button below to enter the id
      </h2>
      <button className='w-[100px] h-[40px] text-[11px]  flex flex-row justify-center items-center  bg-purple-700  hover:bg-purple-400 text-white rounded-lg mb-6'
      onClick={()=> {setShowDiv(false); setShowDiv2(true); setShowInput(false)}}
      > Enter your ID</button>
    </div>

<div className={` ${showDiv2?'flex':'hidden'} w-full flex flex-col items-center mb-16 mt-6`}>

<div className='w-full flex flex-col items-center'>

<div className='md:w-1/2 w-full text-[16px] flex flex-col  items-center'>

<div className='w-full  flex flex-col items-center mb-6'>

<div className=' w-full text-[16px] flex flex-row justify-start items-center mb-4'>
Chat ID:
</div>
<input type="text" value={testRoom} disabled={true} className={`${showInput?'block':'hidden'}  rounded-md w-full  outline-none mb-4 p-2 `} />
<input type="text"  className={` ${showInput?'hidden':'block'} w-full   outline-none focus:ring-2 focus:ring-indigo-600 rounded-md  shadow-black dark:shadow-white shadow-md p-2` } onChange={(e)=> setTestRoom?.(e.target.value)}     placeholder='Enter the key....' />

<div>

</div>

</div>

<h6 className='w-full flex flex-row justify-start items-center mb-4 '>Enter your name</h6>

<input type="text" onChange={(e)=>setTestName?.(e.target.value)} placeholder='Enter your name...' className='w-full p-2  outline-none focus:ring-2 focus:ring-indigo-600 rounded-md shadow-black dark:shadow-white shadow-md mb-6' />


<h6 className='w-full flex flex-row justify-start items-center  text-[16px] mb-4'>Choose your avatar...</h6>  
<div className='w-full flex flex-row justify-start items-center overflow-hidden hover:overflow-auto p-4 mb-6'>
{
avatar.map((itr,index)=>(
<Image
key={index}
src={itr.img}
width={8}
height={8}
alt='loading'
onClick={()=>setTestAvatar?.(itr.img)}
className='size-16 mr-2 ml-2 rounded-full border-2 shadow-black dark:shadow-white shadow-md border-red-400 dark:border-cyan-400 cursor-pointer'
/>
))
}

</div>
<div className='w-full flex flex-row justify-center items-center'>
  
  <button   className={'w-[100px] h-[40px] text-[11px]  flex flex-row justify-center items-center  bg-purple-700  hover:bg-purple-400 text-white rounded-lg mb-6 mr-4'} onClick={()=>{setShowDiv(true);setShowDiv2(false)}}
        >Back</button>

<Link  href='/chat_room/chat_test_tmp' className={'w-[100px] h-[40px] text-[11px]  flex flex-row justify-center items-center  bg-purple-700  hover:bg-purple-400 text-white rounded-lg mb-6 '}
>Join and chat</Link>
</div>

</div>
</div>



</div>




    </div>

  )
}

export default Middleware
