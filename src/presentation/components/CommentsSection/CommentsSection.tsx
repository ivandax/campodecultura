import React, { useState, useEffect } from "react";
import { CreateCommentData, Comment } from "@src/domain/Comment";
import { Result } from "@src/domain/Result";
import {
  createComment,
  getCommentsByPostId,
  deleteComment,
} from "@src/persistence/comment";
import { AppUser } from "@src/domain/AppUser";
import * as S from "./CommentsSection.Styles";
import { Link } from "react-router-dom";
import { timestampToHumanReadbleDate } from "@src/presentation/utils";

interface CommentsSectionProps {
  postId: string;
  user: AppUser | null;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId, user }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<null | string>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      const result: Result<Comment[]> = await getCommentsByPostId(postId);
      setLoading(false);
      if (result.error) {
        setError("Failed to load comments");
        return;
      }
      setComments(result.data);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (user: AppUser) => {
    if (newComment.trim() === "") {
      setMessage("Comment cannot be empty");
      return;
    }

    const commentData: CreateCommentData = {
      text: newComment,
      author: user.name ?? user.email,
      createdOn: Date.now(),
      postId,
      userId: user.id,
    };

    const result = await createComment(commentData);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setComments((prev) => [...prev, { id: result.data, ...commentData }]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: string) => {
    const result = await deleteComment(commentId);
    if (result.error) {
      setMessage("Failed to delete comment");
      return;
    }
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  if (!user) {
    return (
      <S.Container>
        <p>To view and add comments you must log in</p>
        <Link to="/login">Log in</Link>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>Comments</S.Title>

      {loading ? (
        <S.Message>Loading comments...</S.Message>
      ) : error ? (
        <S.Error>{error}</S.Error>
      ) : comments.length === 0 ? (
        <S.Message>No comments yet. Be the first to comment!</S.Message>
      ) : (
        <S.CommentsList>
          {comments.map((comment) => (
            <S.CommentItem key={comment.id}>
              <S.CommentContent>
                <S.CommentText>
                  <strong>{comment.author}</strong>: {comment.text}
                </S.CommentText>
                <S.CommentDate>
                  {timestampToHumanReadbleDate(comment.createdOn, "es")}
                </S.CommentDate>
              </S.CommentContent>

              {comment.userId === user.id && (
                <S.MenuContainer>
                  <S.MenuButton>⋮</S.MenuButton>
                  <S.PopupMenu>
                    <S.MenuItem onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </S.MenuItem>
                  </S.PopupMenu>
                </S.MenuContainer>
              )}
            </S.CommentItem>
          ))}
        </S.CommentsList>
      )}

      <S.AddComment>
        <S.TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows={3}
        />
        {message && <S.Error>{message}</S.Error>}
        <S.Button
          onClick={() => handleAddComment(user)}
          disabled={!newComment.trim()}
        >
          Post Comment
        </S.Button>
      </S.AddComment>
    </S.Container>
  );
};

export { CommentsSection };
