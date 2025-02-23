import Parser from "rss-parser";

const parser = new Parser();

export const fetchRSS = async (url: string) => {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map((item) => ({
      title: item.title || "No title",
      link: item.link || "#",
      pubDate: item.pubDate || "No date",
      description: item.contentSnippet || "No description",
    }));
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};
