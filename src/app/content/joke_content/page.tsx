
import {Joke,JokeCategory} from '../contents_types'
import Joke_show from './joke';
  export async function F_Joke(): Promise<Joke[]> {
  const allJokes: Joke[] = [];


  const baseUrl = "https://official-joke-api.appspot.com/jokes/";
  for (let i = 1; i <= 100; i++) {
    const url = `${baseUrl}${i}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching joke: ${response.status}`);
      }
      const data: Joke = await response.json();
      allJokes.push(data);
    } catch (error) {
      console.error("Error fetching joke:", error);

    }
  }


return allJokes

 
}
  
    export default async function Content_jokes() {
  const allJokes: Joke[] = await F_Joke();
  return  ( <div className="w-full flex flex-row justify-center items-center">
  <Joke_show jokes={allJokes} />
</div>
  )
}
  