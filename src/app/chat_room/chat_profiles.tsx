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
    
  ];
  return (
    <div className='w-screen flex-col justify-center align-middle overflow-hidden'>
      <div className='w-full top-profiles grid grid-row-1 grid-flow-row gap-1 tb:gap-2'>

          <div className='add_profiles min-h-screen bg-red-300 w-1/6 flex flex-col p-2 overflow-y-scroll'>
            {profiles.map((profile) => (
              <div key={profile.id} className='profiles p-2 size-12 text-white  gap-1 tb:gap-4 flex flex-row justify-center align-middle'>

          <div className='add w-12 h-12 rounded-full bg-slate-400'>
            <Image
              src="plus_icon.svg"
              width={45}
              height={45}
              alt="Picture of the author"
            />
      </div>
            <div>  {profile.name}</div>

              </div>
              
            ))}
          </div>
      </div>
    </div>
  );
}

export default Chat_profiles
