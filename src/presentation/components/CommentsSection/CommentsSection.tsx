import React, { useState, useEffect } from "react";
import { CreateCommentData, Comment } from "@src/domain/Comment";
import { Result } from "@src/domain/Result";
import { createComment, getCommentsByPostId } from "@src/persistence/comment";
import { AppUser } from "@src/domain/AppUser";
import * as S from "./CommentsSection.Styles";
import { Link } from "react-router-dom";

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

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      setMessage("Comment cannot be empty");
      return;
    }

    const commentData: CreateCommentData = {
      text: newComment,
      author: "Anonymous",
      createdOn: Date.now(),
      postId,
    };

    const result = await createComment(commentData);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setComments((prev) => [...prev, { id: result.data, ...commentData }]);
    setNewComment("");
  };

  if (!user) {
    return (
      <S.Container>
        <p>To view and add comments you must log in</p>
        <Link to="/login" />
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
              <S.CommentText>
                <strong>{comment.author}</strong>: {comment.text}
              </S.CommentText>
              <S.CommentDate>
                {new Date(comment.createdOn).toLocaleString()}
              </S.CommentDate>
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
        <S.Button onClick={handleAddComment} disabled={!newComment.trim()}>
          Post Comment
        </S.Button>
      </S.AddComment>
    </S.Container>
  );
};

export { CommentsSection };
