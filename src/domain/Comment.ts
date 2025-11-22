export interface CreateCommentData {
  text: string;
  author: string;
  createdOn: number;
  postId: string;
  userId: string;
}

export interface Comment extends CreateCommentData {
  id: string;
}
