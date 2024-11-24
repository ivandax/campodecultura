export interface CreatePostData {
  title: string;
  content: string;
  createdOn: number;
  editedOn: number;
  author: string;
  coverImage: string | null;
  categories: string[];
  language: "en" | "es";
}

export type Post = CreatePostData & { id: string };
