export interface CreatePostData {
  title: string;
  content: string;
  createdOn: number;
  editedOn: number;
  author: string;
  coverImage: string | null;
  categories: string[];
  language: "en" | "es";
  status: "draft" | "published";
}

export type Post = CreatePostData & { id: string };
