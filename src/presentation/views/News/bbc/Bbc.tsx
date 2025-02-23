import { fetchRSS } from "@src/persistence/rss-fetch";
import { useEffect, useState } from "react";

function Bbc() {
  const [news, setNews] = useState<
    { title: string; link: string; pubDate: string; description: string }[]
  >([]);

  const BBC_RSS_URL = "https://feeds.bbci.co.uk/news/world/rss.xml";

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchRSS(BBC_RSS_URL);
      console.log(articles);
      setNews(articles);
    };

    loadNews();
  }, []);

  return (
    <div className="news-feed">
      <h2>🌍 BBC News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <strong>{article.title}</strong>
            </a>
            <p>{article.description}</p>
            <small>{new Date(article.pubDate).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Bbc };
