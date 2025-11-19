import { useEffect, useState } from "react";
import parse from "html-react-parser";
import * as S from "./ViewPost.Styles";
import { getPost, deletePost } from "@src/persistence/post";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "@src/domain/Post";
import {
  notifyError,
  notifySuccess,
  timestampToHumanReadbleDate,
} from "@src/presentation/utils";
import { useAuthStore } from "@src/presentation/store/authStore";
import { DeleteButton } from "@src/presentation/components/Buttons/DeleteButton";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { CommentsSection } from "@src/presentation/components/CommentsSection";
import { Spinner } from "@src/presentation/components/Spinner";

function ViewPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const { userTask } = useAuthStore();

  const enableCoverImage = false;

  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const userIsOwner =
    userTask.status === "successful" &&
    userTask.data !== null &&
    userId &&
    userTask.data.id === userId;

  const user = userTask.status === "successful" ? userTask.data : null;

  const handleDelete = async () => {
    if (!postId || !userIsOwner) return;
    setIsDeleting(true);
    const result = await deletePost(postId);
    setIsDeleting(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("Post removed");
    if (userId) {
      navigate(`/posts/${userId}`);
      return;
    }
    navigate("/home");
  };

  useEffect(() => {
    const handleGetPost = async () => {
      if (!postId) {
        setMessage("Error getting id from params");
        return;
      }
      const postResult = await getPost(postId);
      if (postResult.error) {
        setMessage(postResult.error.message);
        return;
      }
      setPost(postResult.data);
    };

    handleGetPost();
  }, [postId]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notifySuccess("Post URL copied to clipboard!");
    } catch (err) {
      notifyError("Failed to copy URL");
    }
  };

  return (
    <S.Wrapper>
      {!post ? (
        <S.LoadingWrapper>
          <Spinner />
        </S.LoadingWrapper>
      ) : post.status === "draft" && !userIsOwner ? (
        <div>This post is a draft and access if forbidden</div>
      ) : (
        <>
          {post.coverImage && enableCoverImage ? (
            <S.PhotoPreview>
              <img
                src={post.coverImage}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            </S.PhotoPreview>
          ) : null}
          <S.Top>
            <h3>{post.title}</h3>
            <MainButton onClick={handleCopyUrl}>Copy URL</MainButton>
          </S.Top>
          <S.Paper>{parse(post.content)}</S.Paper>
          <S.GrayWrapper>{`Edited on: ${timestampToHumanReadbleDate(
            post.editedOn,
            "en"
          )}`}</S.GrayWrapper>
          <S.GrayWrapper>{`Written by: ${
            post.author?.name ?? "Not found"
          }`}</S.GrayWrapper>
          {post.acceptComments && (
            <CommentsSection postId={post.id} user={user} />
          )}
          <S.Footer>
            <MainButton onClick={() => navigate("/home")}>Go back</MainButton>
          </S.Footer>

          {userId && userIsOwner && (
            <S.AdminBlock>
              <h5>Author actions</h5>
              <button
                onClick={() => navigate(`/posts/${userId}/edit/${postId}`)}
              >
                Edit post
              </button>
              <h5
                style={{
                  marginTop: "24px",
                  padding: "8px",
                  width: "100%",
                }}
              >
                Delete post:
              </h5>
              <input
                type="text"
                placeholder="Write 'delete' to enable button"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                style={{
                  padding: "8px",
                }}
              />
              <DeleteButton
                isDeleting={isDeleting}
                deleteInput={deleteInput}
                handleDelete={handleDelete}
              />
            </S.AdminBlock>
          )}
        </>
      )}

      {message && <p>{message}</p>}
    </S.Wrapper>
  );
}

export { ViewPost };
