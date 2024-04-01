export interface Meme {
    url: string;
    name: string;
    width: number;
    height: number;
  }
  export enum JokeCategory {
    General = 'general',
    Programming = 'programming',
    Dad = 'dad',
  }
  
  export interface Joke {
    type: JokeCategory;
    setup: string;
    punchline: string;
    id:number
  }
  export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    // Add other properties as needed based on News API response
  }
  

export interface NewsData {
  articles: Article[];
}
