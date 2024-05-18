import React from 'react'

function About() {
const sty1="w-full flex flex-row justify-start items-center"
const sty2="w-full flex flex-col"
const sty3="w-full flex flex-row justify-start text-2xl font-bold mb-6"
const color="bg-clip-text text-transparent dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400"
  return (
   <div className="w-full bg-back-all flex flex-col justify-center items-center bg-cover p-1 md:p-4">
    <h1 className=" sticky top-0  w-full flex flex-row justify-center items-center text-4xl font-bold mt-2 mb-8 text-clip  mix-blend-exclusion">About SmartChat...</h1>
    <div className='w-full flex flex-row justify-center items-center'>
   <div className='w-11/12 flex flex-row justify-center backdrop-blur-sm bg-black/40 p-4 rounded-md'>
        <div className=" w-full text-slate-200  flex flex-col">
          <div className={`${sty2} md:p-4`}>
            <p className={`${sty1}   mb-2 md:mb-4`}>
              Welcome to SmartChat! We're a team dedicated to creating a seamless and
              engaging chat experience for everyone. We believe in the power of
              communication to connect people, build relationships, and foster
              collaboration. With SmartChat, we aim to make communication simpler,
              more efficient, and ultimately, more enjoyable.
            </p>
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>Our Mission</h2>
    
            <ul className={`${sty2}   mb-2 md:mb-4`}>
              <li>
                To empower users with a user-friendly and intuitive chat platform.
              </li>
              <li>To foster meaningful connections and communication.</li>
              <li>To provide a secure and reliable environment for conversations.</li>
              <li>To constantly innovate and improve the SmartChat experience.</li>
            </ul>
    
            <h2 className={`${sty3} sticky top-0 p-2 dark:bg-gradient-to-tr dark:from-indigo-700 dark:via-indigo-800 dark:to-gray-900 bg-gradient-to-tr from-purple-400 via-purple-300 to-gray-400`}>What Makes Us Different</h2>
    
            <ul className={`${sty2}   mb-2 md:mb-4`}>
              <li>
                **Focus on Simplicity:** We prioritize a clean and intuitive
                interface that's easy for anyone to learn and use.
              </li>
              <li className={`${sty2}`}>
                **Feature-Rich Platform:** We offer a variety of features to enhance
                your chat experience, including:
                <ul className={`${sty2}`}>
                  <li>Group chats: Connect with multiple people at once.</li>
                  <li>Media sharing: Share photos, videos, and files effortlessly.</li>
                  <li>Voice and video calls: Take your conversations to the next level.</li>
                  <li>Customization options: Personalize your chat experience with themes, emojis, and more.</li>
                </ul>
              </li>
              <li >
                **Security & Privacy:** We take your security and privacy seriously.
                We implement industry-standard security measures and provide users
                with control over their data.
              </li>
              <li>
                **Constant Development:** We're continuously working on adding new
                features and improvements based on user feedback.
              </li>
            </ul>
    
   
    
            <h1 className={`w-full flex flex-row justify-center text-3xl mb-2 md:mb-4 font-semibold ${color}`}>Join the SmartChat Community</h1>
    
            <p className={`${sty1}   mb-2 md:mb-4`}>
              We invite you to the SmartChat and experience the difference for
              yourself. We're always looking for feedback and suggestions, so feel
              free to reach out to us through our social media channels or support
              email.
            </p>
    
            <h1 className={`w-full flex flex-row justify-center text-3xl mb-2 font-semibold md:mb-4 ${color} `}>Thank you for choosing SmartChat!</h1>
          </div>
        </div>
        </div>
        </div>
        </div>
      
  )
}

export default About
