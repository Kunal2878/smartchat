import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Contact() {
const sty1="w-full flex flex-row justify-start items-center"
const sty2="w-full flex flex-col"
const sty3="w-full flex flex-row justify-start text-2xl font-bold mb-6"
const color="bg-clip-text text-transparent dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-300 via-purple-200 to-gray-400"
  return (
   <div className="w-full h-screen bg-back-all flex flex-col justify-center items-center bg-cover p-1 md:p-4">
    <h1 className=" sticky top-0  w-full flex flex-row justify-center items-center text-4xl font-bold mt-2 mb-8 text-clip  mix-blend-exclusion">Contact Us...</h1>
    <div className='w-full flex flex-row justify-center items-center'>
   <div className='w-11/12 flex flex-row justify-center backdrop-blur-sm bg-black/40 p-4 rounded-md'>
        <div className=" w-full text-slate-200  flex flex-col">
          <div className={`${sty2} md:p-4`}>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            We'd love to hear from you! Whether you have a question, a suggestion, or just want to say hi, feel free to reach out to us by clicking the link below.
    
  
            </p>
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Contact Information</h2>

            <div className={`w-full flex flex-row justify-center   mb-2 md:mb-4`}>
            <div className='size-8 md:size-12 flex flex-row justify-center items-center mr-4'>
<Image
width={20}
height={20}
src="gmail.svg"
alt="loading...."
className='size-full'

/>
</div> 

 <Link href="mailto:tes.res246@gmail.com" className="w-120 flex flex-row justify-center items-center">Email at <u className='md:text-2xl text-xl text-blue-400'>@support_Smartchat.com</u></Link>
            </div>
    
            
    
            
    
        
    
    
            <h1 className={`w-full flex flex-row justify-center text-2xl md:text-3xl mb-2 font-extrabold md:mb-6 ${color} `}>Thank you for choosing SmartChat!</h1>
          </div>
        </div>
        </div>
        </div>
        </div>
      
  )
}

export default Contact
