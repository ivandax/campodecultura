export const fetchNews = async (
  baseUrl: string,
  apiKey: string,
  country = "us",
  category = "general"
) => {
  try {
    const response = await fetch(
      `${baseUrl}?country=${country}&category=${category}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.articles.map((article: any) => ({
      title: article.title,
      link: article.url,
      image: article.urlToImage,
      description: article.description,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
