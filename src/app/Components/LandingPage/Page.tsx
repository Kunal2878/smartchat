
import React from 'react'
import Image from 'next/image';
const LandingPage = () => {
  return (
    <div className='w-full bg-white h-screen flex flex-col'>
      <div className='w-full flex-row justify-center'>
      <Image
          src="google.svg"  // Replace with the actual path to your image
          alt="Your Alt Text"    // Replace with the alt text for your image
          width={100}
          height={100}
          className='rounded-full'
        />
      </div>
      {/* <div className='w-full h-full' 
      style={{
      backgroundImage: 'url("wave1.svg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    
    }}>

      </div> */}
    </div>
  )
}

export default LandingPage;
