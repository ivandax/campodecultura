export interface CreatePostData {
  title: string;
  content: Array<string>;
  createdOn: number;
  author: string;
}

export type Post = CreatePostData & { id: string };
