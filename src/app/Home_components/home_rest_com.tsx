'use client'; // Ensure client-side rendering
import {UseAppContext} from '../index'
import React, { useState, useEffect,useRef } from 'react';
import Image from 'next/image';
import Mob_sidebar from './mob_sidebar'
import { useTheme } from 'next-themes';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
interface Theme {
  icon: string; 
  text: string; 
}
function Home_rest_com() {
  
  const context = UseAppContext();
  const { isSession,isLoading } = context || {};

  const [isClient, setIsClient] = useState(false);
const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const themes: Theme[] = [
  { icon: 'moon.svg', text: 'dark' },
  { icon: 'sun.svg', text: 'light' },
];
const theme2=[
  { icon: 'smile.svg', text:"Jokes",path:"/content/joke_content" },
  { icon: 'trend.svg',text:"Trending",path:"/content/trend_content"},
  { icon: 'art.svg',text:"Stickers",path:"/content/meme_content" },
  { icon: 'bell.svg',text:"Notifications",path:"/" }
]


const router = useRouter();
const activeLink = (path:string) => {
  router.push(path); // Use router.push for navigation
}
  const toggleTheme = (newIndex: number,mode:string) => {
    setCurrentThemeIndex(newIndex);
    setIsOpen(false); 
    setTheme(mode)
    if(isMenuOpen)
    {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => 
  {setIsOpen(!isOpen);
    setIsMenuOpen(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    
    if(isOpen){
      setIsOpen(false);
    }
  if(isMenuOpen)
    {
      setIsMenuOpen(false);
    }
  };
        useEffect(() => {
      
    setIsClient(true);


    document.addEventListener("click", handleClickOutside);

    return () => {
    
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClient,isOpen,isMenuOpen]);





const menuOpen =() =>
{
  setIsMenuOpen(!isMenuOpen)
  if(isOpen)
  {
    setIsOpen(false)
  }
}


return (

<div className="w-full">


    <div className=" z-20 sticky w-full top-0" >
      {isClient && (

        <div className="w-full flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
          <div
            className="w-full flex flex-row items-center p-2 h-full "
            style={{ zIndex: 200 }}
          >
            <div className="w-2/5 flex flex-row justify-start items-center">
              <Image
              width={24}
              height={24}
              src={"brand.svg"}
              alt='Loading....'
              />
              <button className="ml-2 w-20 h-8 rounded-lg text-[16px]">
             <span className='w-full font-black h-full bg-clip-text text-transparent  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>SmartChat</span> 
              </button>
            </div>
          


            <div className="w-2/3 flex flex-row justify-end items-center text-sm">
<div className='hidden  md:w-4/5 md:flex flex-row justify-end items-center text-sm '>
  {theme2.map((itr) => (  
<div key={itr.icon} className='w-1/4 flex flex-row justify-end items-center mr-4'>

<button className=" group w-1/4 flex flex-row  md:mr-3  active:border-b-purple-900" onClick={() => router.push(itr.path)}>

<Image
              width={20}
              height={20}
              src={itr.icon}
              alt='Loading....'
              className='  '
              />
<span className=" text-xs  text-white dark:text-gray-900 dark:group-hover:text-white group-hover:text-slate-900 "
  >{itr.text}</span>

</button>
</div>
))}


</div>
        <button
        className="group w-20 md:w-28 flex justify-end md:ml-4 "
        onClick={toggleMenu}
      >
        <Image
              width={20}
              height={20}
              src={theme === 'light' ? themes[1].icon : themes[0].icon}
              alt='Loading....'
              />
        <span className='hidden lg:block text-xs text-white dark:text-gray-900 dark:group-hover:text-white group-hover:text-slate-900'> Themes</span>
      </button>

      <div className="md:hidden w-2/5 flex justify-center items-center ">
              <button className="w-20 h-8 rounded-lg flex justify-center items-center " onClick={menuOpen}>
              <Image
              width={20}
              height={20}
              src={"menu.svg"}
              alt='Loading....'
              />
              </button>
            </div>
      <div className="hidden md:w-1/5 md:flex justify-end ">

        {isSession ? (
            <form action="/auth/signout" method="post">
          <button className="w-20 h-8 text-white rounded-lg bg-violet-800 text-[10px] hover:bg-violet-500" type="submit">
            Log out
          </button>
        </form>
        ) : (
        <form action="/auth/signup" method="post">
        <button className="w-20 h-8 text-white rounded-lg bg-violet-800 text-[10px] hover:bg-violet-500" type="submit">
        Login/Signup
        </button>
      </form>
        )}
 
    
 

      
            </div>
          
              </div>
              </div>

      {
      isOpen && (
        <div className="z-50 w-full md:pr-4" ref={menuRef} >
        <div className=" absolute w-2/5 md:w-1/5 right-0 md:mr-4 mr-8 p-1  flex flex-col  rounded-md bg-slate-800  theme-dropdown">
          {themes.map((theme, index) => (
            <button
              key={index}
              className="p-2 flex flex-row  items-center "
              onClick={() => toggleTheme(index,theme.text)}
            >
              <Image
              width={20}
              height={20}
              src={theme.icon}
              alt='Loading....'
              className='mr-2 md:mr-4'
              />
              <span className='  text-xs text-slate-500  '>{theme.text}</span>
            </button>
        
          ))}
              </div>
              </div>
      )}
          
           {isMenuOpen && (
     <Mob_sidebar IsSession={isSession} />
           )}
    </div>
  )
          }
          
      </div>




      </div>
  );
}

export default Home_rest_com;
