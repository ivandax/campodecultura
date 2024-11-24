export interface CreatePostData {
  title: string;
  content: string;
  createdOn: number;
  editedOn: number;
  author: string;
  coverImage: string | null;
}

export type Post = CreatePostData & { id: string };
