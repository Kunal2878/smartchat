"use client"
import * as React from "react";

import {Joke,JokeCategory} from '../contents_types'
import domtoimage from 'dom-to-image';
import { copyImageToClipboard,canCopyImagesToClipboard,requestClipboardWritePermission } from 'copy-image-clipboard'


function Joke_show({ jokes }: { jokes: Joke[] }) {
  const emojis = [
    {
      bg: "/emo_1.svg",
    },
    {
      bg: "/emo_2.jpg",
    },
    {
      bg: "/emo_3.jpg",
    },
    {
      bg: "/emo_4.jpg",
    },
    {
      bg: "/emo_5.jpg",
    },
    {
      bg: "/emo_6.jpg",
    },
   
  ];

  const [copiedImage, setCopiedImage] = React.useState<boolean>(false);
 

function handleJokeClick  (canvas:any) {
 console.log(canvas)
  if (canvas) {
    const divRef = canvas;
    drawTextOnCanvas(divRef);
  } else {
    console.error("Clicked element doesn't have a ref");
  }
};
        function drawTextOnCanvas(canvasRef: any) {
    const canvas = canvasRef;

    domtoimage
      .toPng(canvas)
      .then((dataUrl: string) => {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = dataUrl;
        img.src=dataUrl
        console.log("Generated dataUrl:", dataUrl);

        // Add missing 'alt' property
        handleCopyImage(dataUrl)

        // document.body.appendChild(img);
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });

  }

 function randomImageUrl(emojis: any[]) {
    return `url(${emojis[Math.floor(Math.random() * emojis.length)].bg})`;
  }


  const handleCopyImage = async (imageUrl: string) => {
    if (canCopyImagesToClipboard()) {
      requestClipboardWritePermission().then(
        (hasPermission) => {
          if (hasPermission) {
            console.log("done");
            copyImageToClipboard(imageUrl)
              .then(() => {
                setCopiedImage(true);
              });
          }
        }
      );
    } else {
      alert("permission denied");
    }
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => setCopiedImage(false), 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copiedImage]);


  return (
    <div className="p-2 md:p-3 w-full">
      {jokes.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {jokes.map((jokeData) => (
            <div
              key={jokeData.id}
              className="w-full hover:opacity-30 transition ease-in-out delay-600 duration-800 h-40 text-[16px] text-slate-500 font-black aspect-w-1 aspect-h-1 md:aspect-w-16 md:aspect-h-9 border-2 border-cyan-600 rounded-md overflow-hidden hover:border-violet-500  "
            >
              <div
                onClick={(e) => handleJokeClick(e.currentTarget)}
                className="w-full  flex flex-col h-40 text-[14px] text-slate-500 font-black aspect-w-1 aspect-h-1 md:aspect-w-16 md:aspect-h-9 border-2 border-cyan-600 rounded-md overflow-hidden hover:border-violet-500 cursor-pointer p-2"
                style={{
                  backgroundImage: `url(${
                    emojis[jokeData.id % emojis.length].bg
                  })`,
                  backgroundSize: "cover",
                }}
              >
                <p className="w-full mb-2 flex flex-row justify-center ">
                  {jokeData.setup}
                </p>
                <p className="w-full">{jokeData.punchline}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {copiedImage && (
        <div className="fixed top-0 md:top-1/2 left-1/8 md:left-0 w-full md:w-full md:h-24 h-full bg-transparent flex justify-center items-center z-50">
          <span className="dark:text-gray-900 dark:bg-white bg-slate-600 text-white  w-full flex justify-center items-center">
            Image Copied Successfully
          </span>
        </div>
      )}
    </div>
  );
}


export default Joke_show;
