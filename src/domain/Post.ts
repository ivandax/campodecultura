export interface CreatePostData {
  title: string;
  content: Array<string>;
  createdOn: number;
  author: string;
  coverImage: string | null;
}

export type Post = CreatePostData & { id: string };
