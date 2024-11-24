export interface TextContent {
  type: "text";
  content: string;
}

export interface ImageContent {
  type: "image";
  src: string;
}

export type Content = ImageContent | TextContent;
export interface CreatePostData {
  title: string;
  content: string;
  createdOn: number;
  author: string;
  coverImage: string | null;
}

export type Post = CreatePostData & { id: string };
