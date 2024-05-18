import React from 'react'
import Link from 'next/link'
function Privacy() {
const sty1="w-full flex flex-row justify-start items-center"
const sty2="w-full flex flex-col"
const sty3="w-full flex flex-row justify-start text-2xl font-bold mb-6"
const color="bg-clip-text text-transparent dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400"
  return (
   <div className="w-full bg-back-all flex flex-col justify-center items-center bg-cover p-1 md:p-4">
    <h1 className=" sticky top-0  w-full flex flex-row justify-center items-center text-4xl font-bold mt-2 mb-8 text-clip  mix-blend-exclusion">Privacy policy...</h1>
    <div className='w-full flex flex-row justify-center items-center'>
   <div className='w-11/12 flex flex-row justify-center backdrop-blur-sm bg-black/40 p-4 rounded-md'>
        <div className=" w-full text-slate-200  flex flex-col">
          <div className={`${sty2} md:p-4`}>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            SmartChat  is committed to protecting the privacy
        of our users . This Privacy Policy explains how we
        collect, use, disclose, and protect your information when you use our
        chat web app.
            </p>
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Information We Collect</h2>

            <p className={`${sty1}   mb-2 md:mb-4`}>
            We collect the following types of information when you use the Service:
            </p>
    
            <ul className={`${sty2}   mb-2 md:mb-4`}>
            <li>
          **Account Information:** When you create an account, we collect your
          username, email address, and password (hashed and securely stored).
          You may also choose to provide a profile picture and other optional
          information.
        </li>
        <li>
          **Usage Data:** When you use the Service, we collect information
          about your activity, such as the messages you send and receive, the
          groups you join, and the time and date of your activity.
        </li>
        <li>
          **Device Information:** We collect information about the device you
          use to access the Service, such as the device type, operating system,
          IP address, and browser type.
        </li>
        <li>
          **Log Data:** When you use the Service, we automatically collect log
          data, such as browser type, operating system, internet protocol (IP)
          address, access times, pages visited, and other information collected
          by cookies and similar technologies.
        </li>
            </ul>
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>How We Use Your Information</h2>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            How We Use Your Information
            </p>
            <ul className={`${sty2}   mb-2 md:mb-4`}>
             
        <li>To provide and maintain the Service;</li>
        <li>To create and manage your account;</li>
        <li>To improve the Service and develop new features;</li>
        <li>To send you important information about the Service, such as updates, security alerts, and support messages;</li>
        <li>To personalize your experience with the Service;</li>
        <li>To comply with legal and regulatory requirements.</li>
            </ul>
    
   
    
    
            <p className={`${sty1}   mb-2 md:mb-4`}>
    
        **This Privacy Policy is incorporated into and subject to the 
        <Link href="/privacy" className=' text-blue-700 flex flex-row justify-center items-center text-2xl'>
            <u> Terms of Service </u>
        </Link>
        
            </p>
    
    
            <h1 className={`w-full flex flex-row justify-center text-3xl mb-2 font-semibold md:mb-4 ${color} `}>Thank you for choosing SmartChat!</h1>
          </div>
        </div>
        </div>
        </div>
        </div>
      
  )
}

export default Privacy
