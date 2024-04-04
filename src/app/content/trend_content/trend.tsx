"use client"
import * as React from "react";
import { Article, NewsData } from "../contents_types";
import Image from "next/image";

export default function Trend_show({ Trend }: { Trend: Article[] }) {
  return (
    <div className="w-full flex flex-col justify-center items-center  bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-2 ">
      {Trend.map((article: Article) => (
        <>
          {article.title !== "[Removed]" && (
            <div
              key={article.title}
              className="w-full h-60 md:h-80 flex flex-row justify-start items-center aspect-w-1 aspect-h-1 md:aspect-w-16 md:aspect-h-9 mb-2 "
              style={{
                backgroundImage: `url(${
                  article.urlToImage?.includes("https://cdn.vox-cdn.com/") ||
                  article.urlToImage === null
                    ? "/grad_pos.jpg"
                    : article.urlToImage
                })`,
                backgroundSize: "cover",
                objectFit:"cover"
              }}
            >
              <div className="w-1/4 h-full aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-3 flex justify-start">
                <Image
                  unoptimized={true}
                  width={10}
                  height={10}
                  src={article.urlToImage || "/grad_pos.jpg"}
                  alt="Loading"
                  className="size-full object-cover "
                />
              </div>
              <div className="w-3/4 h-full flex flex-col justify-center items-center backdrop-blur-md bg-black/20 p-2 hover:bg-slate-600 overflow-hidden hover:overflow-y-auto transition ease-in-out delay-400 duration-1000">
                <div className="w-full flex flex-row text-[18px] md:text-[20px] font-800 text-white">
                  {article.title}{" "}
                </div>
                <div className="w-full flex flex-row text-[12px] text-slate-200 font-600">
                  {article.description}
                </div>
                <div className="w-full flex flex-row justify-between text-[10px] text-yellow-400 font-600">
                  {article.publishedAt}
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
