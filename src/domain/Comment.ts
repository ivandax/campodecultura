export interface CreateCommentData {
  text: string;
  author: string;
  createdOn: number;
  postId: string;
}

export interface Comment extends CreateCommentData {
  id: string;
}
