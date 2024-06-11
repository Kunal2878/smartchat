import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Terms and Conditions',

}
function Terms() {
const sty1="w-full flex flex-row justify-start items-center"
const sty2="w-full flex flex-col"
const sty3="w-full flex flex-row justify-start text-2xl font-bold mb-6"
const color="bg-clip-text text-transparent dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400"
  return (
   <div className="w-full bg-back-all flex flex-col justify-center items-center bg-cover p-1 md:p-4">
    <h1 className=" sticky top-0  w-full flex flex-row justify-center items-center text-4xl font-bold mt-2 mb-8 text-clip  mix-blend-exclusion">Terms and Conditions...</h1>
    <div className='w-full flex flex-row justify-center items-center'>
   <div className='w-11/12 flex flex-row justify-center backdrop-blur-sm bg-black/40 p-4 rounded-md'>
        <div className=" w-full text-slate-200  flex flex-col">
          <div className={`${sty2} md:p-4`}>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            Welcome to SmartChat! These Terms and Conditions govern your use of our chat web app operated by SmartChat.
  
            </p>
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Your Agreement</h2>

            <p className={`${sty1}   mb-2 md:mb-4`}>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
    
            </p>
    
            
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Your Account</h2>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            If you create an account on the Service, you are responsible for maintaining the confidentiality of your account and password and restricting access to your device, and you agree to accept responsibility for all activities that occur under your account or password. You may not use the Service for any illegal or unauthorized purposes.
    
            </p>
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Intellectual Property</h2>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            The Service and its original content, features and functionality are and will remain the exclusive property of SmartChat and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws of the United States and foreign countries.</p>
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Termination</h2>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>

            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Disclaimer</h2>
            <p className={`${sty1}   mb-2 md:mb-4`}>
            Your use of the Service is at your sole risk. The Service is provided on an "as is" and "as available" basis. SmartChat makes no representations or warranties of any kind, express or implied, regarding the accuracy, completeness or availability of the content or services contained on the Service.
      </p>
            <p className={`${sty1}   mb-4 md:mb-6`}>
            We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms and Conditions on this page.
    
      </p>
    
        
    
    
            <h1 className={`w-full flex flex-row justify-center text-3xl mb-2 font-extrabold md:mb-6 ${color} `}>Thank you for choosing SmartChat!</h1>
          </div>
        </div>
        </div>
        </div>
        </div>
      
  )
}

export default Terms
