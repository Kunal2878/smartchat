"use client"
import * as React from "react";
import Image from 'next/image';
import { Meme } from '../contents_types';
import { copyImageToClipboard,canCopyImagesToClipboard,requestClipboardWritePermission } from 'copy-image-clipboard'


function Meme_show({ memes }: { memes: Meme[] }) {
  const [copiedImage, setCopiedImage] = React.useState<boolean>(false);

  const handleCopyImage = async (imageUrl: string) => {
    if (canCopyImagesToClipboard()) {
        requestClipboardWritePermission().then(
        (hasPermission) => {
         
          if (hasPermission) {
           
            copyImageToClipboard(imageUrl)
              .then(() => {
                setCopiedImage(true)
              
                
              })
              
            }
          }
          );
        }
        else{
          alert("permission denied")
        }
      };
      React.useEffect(() => {
        const timeoutId = setTimeout(() => setCopiedImage(false), 1000);
        
        return () =>{
          clearTimeout(timeoutId); 
   
        } 
      }, [copiedImage]);

  return (
    <div className="p-2 md:p-3 w-full text-gray-900 bg-white dark:bg-slate-900 dark:text-white">
      {memes.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {memes.map((memeData) => (
            <div
              key={memeData.url}
              className="w-full text-[12px] aspect-w-1 aspect-h-1 md:aspect-w-16 md:aspect-h-9 border-2 border-cyan-600 rounded-md overflow-hidden hover:border-violet-500 cursor-pointer"
              onClick={() => handleCopyImage(memeData.url)}
            >
       {copiedImage? (
               <Image
               unoptimized={true}
               src={memeData.url}
                 alt={memeData.name}
               width={memeData.width}
               height={memeData.height}
               className="w-full h-40 opacity-50"
               />
               ) : (
                 <Image
                 unoptimized={true}
                 width={memeData.width}
                 height={memeData.height}
                 src={memeData.url}
                 alt={memeData.name}
                  className="w-full h-40"
                />
              
              )}
            </div>
          ))}
        </div>
      )}
    {copiedImage && (
  <div className="fixed top-0 md:top-1/2 left-1/8 md:left-0 w-full md:w-full md:h-24 h-full bg-transparent flex justify-center items-center z-50"> <span className="dark:text-gray-900 dark:bg-white bg-slate-600 text-white  w-full flex justify-center items-center">
      Image Copied Successfully
    </span>
  </div>
)}
    </div>
  );
}



export default Meme_show;
