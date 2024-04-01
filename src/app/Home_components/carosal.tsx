"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image'
const images = [
  '/land_2_re.png',
  '/land_3.jpeg',
  '/land_2.jpg',

];
const text=[
    "Fast and Easy",
    "Featured",
    "multiple modes"
]
const banner=[
  '/ban_1.png',
  '/ban_1.png',
  '/ban_1.png',
]
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 2000); 
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full  p-2 overflow-hidden">
      {/* <button onClick={goToPrevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-l">
        &lt;
      </button> */}
    
      <div className='w-full flex flex-row justify-between items rounded-md p-2 center bg-white' style={{ backgroundImage: `url(${banner[currentIndex]})`,  backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='w-1/3 flex justify-start items-center'> <p className=" font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-center text-2xl md:text-4xl">{text[currentIndex]}</p></div>
        <div className="w-3/5 h-36 md:h-44 aspect-w-2 aspect-h-1 md:aspect-w-16 md:aspect-h-9 flex flex-row justify-end items-center">
          <Image
          unoptimized={true}
          width={200}
          height={200}
         
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`}
          className='w-1/2 h-3/4 object-cover flex-row justify-end items-center'
          />
      {/* <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="" /> */}
      </div>
      </div>
      {/* <button onClick={goToNextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-r">
        &gt;
      </button> */}
    </div>
  );
};

export default Carousel;
