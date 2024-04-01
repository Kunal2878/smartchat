import React from 'react'
import Image from 'next/image'

function Chat_profiles() {  
  const profiles = [
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'},     
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    { id: 1, name: 'John'}, 
    
  ];

  return (
    <div className='w-full h-screen flex-col justify-center align-middle overflow-hidden'>
      <div className='w-full h-full top-profiles grid grid-row-1 grid-flow-row gap-1 tb:gap-2'>

          <div className='add_profiles h-screen bg-red-300 w-full flex flex-col p-2 hover:overflow-y-scroll'>
            {profiles.map((profile) => (
              <div key={profile.id} className='profiles mb-2  w-full text-white flex flex-row justify-start align-middle'>

          <div className='add w-12 h-12 flex  justify-start rounded-full bg-slate-400'>
            <Image
              src="plus_icon.svg"
              width={45}
              height={45}
              alt="Picture of the author"
            />
          
      </div>
            <div className=' flex grow justify-start items-center pl-1'> {profile.name}</div>

              </div>
              
            ))}
          </div>
      </div>
    </div>
  );
}

export default Chat_profiles
