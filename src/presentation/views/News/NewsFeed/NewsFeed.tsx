import { fetchNews } from "@src/persistence/api";
import { useEffect, useState } from "react";

function NewsFeed() {
  const [news, setNews] = useState<
    {
      title: string;
      link: string;
      image: string;
      description: string;
      source: string;
      publishedAt: string;
    }[]
  >([]);

  const API_KEY = "3dbfd758d3b24f6f8ad5474698299711";
  const BASE_URL = "https://newsapi.org/v2/top-headlines";

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchNews(BASE_URL, API_KEY, "us", "technology");
      console.log(articles);
      setNews(articles);
    };

    loadNews();
  }, []);

  return (
    <div className="news-feed">
      <h2>🌍 Latest News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
            </a>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "300px" }}
              />
            )}
            <p>{article.description}</p>
            <small>
              Source: {article.source} |{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { NewsFeed };
