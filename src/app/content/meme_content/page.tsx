import {Meme} from '../contents_types'
import Meme_show from './meme';
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Memes 😛',
}
async function FetchMeme(): Promise<Meme[]> {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const memes = data.data.memes.slice(0, 100);
    return memes.map((memeData:Meme) => ({
        url: memeData.url,
        name: memeData.name,
        width: memeData.width,
        height: memeData.height,
      }));
  }


export default async function Content() {
  const memes = await FetchMeme();

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <Meme_show memes={memes} />
    </div>
  );
}
