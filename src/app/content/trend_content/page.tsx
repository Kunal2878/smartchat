import React from 'react';
import { Article, NewsData } from '../contents_types';
import Trend_show from './trend';
async function F_Trend(): Promise<NewsData> {
  const today = new Date();
  const threeDaysAgo = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000)); // Subtract 3 days in milliseconds

  const apiKey = '5e4b86442c1849e98eca547f46035653';
  const url = `https://newsapi.org/v2/everything?q=general&from=${threeDaysAgo.toISOString()}&to=${today.toISOString()}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url,{ next: { revalidate: 3600 } });
    const data = await response.json() as Promise<NewsData>;
    (await data).articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);

    throw error; 
  }
}



export default async function Contents_trend() {
  try {
    const trend = await F_Trend(); // Wait for data to be fetched

    return (
      <div>
        <Trend_show Trend={trend.articles} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    // Optionally display a loading or error message to the user
  }
}



