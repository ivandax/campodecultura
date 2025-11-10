import { useEffect, useState } from "react";
import parse from "html-react-parser";
import * as S from "./ViewPost.Styles";
import { getPost, deletePost } from "@src/persistence/post";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "@src/domain/Post";
import { timestampToHumanReadbleDate } from "@src/presentation/utils";
import { useAuthStore } from "@src/presentation/store/authStore";
import { DeleteButton } from "@src/presentation/components/Buttons/DeleteButton";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { CommentsSection } from "@src/presentation/components/CommentsSection";

function ViewPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const { userTask } = useAuthStore();

  // ADMIN
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const userIsAdmin =
    userTask.status === "successful" &&
    userTask.data !== null &&
    userTask.data.role === "ADMIN";

  const user = userTask.status === "successful" ? userTask.data : null;

  const handleDelete = async () => {
    if (!postId || !userIsAdmin) return;
    setIsDeleting(true);
    const result = await deletePost(postId);
    setIsDeleting(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("Post removed");
    if(userId){
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

  return (
    <S.Wrapper>
      {!post ? (
        <S.LoadingWrapper>Loading...</S.LoadingWrapper>
      ) : (
        <>
          {post.coverImage ? (
            <S.PhotoPreview>
              <img
                src={post.coverImage}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            </S.PhotoPreview>
          ) : null}
          <h3>{post.title}</h3>
          <S.GrayWrapper>{`Edited on: ${timestampToHumanReadbleDate(
            post.editedOn,
            "es"
          )}`}</S.GrayWrapper>
          <S.Content>{parse(post.content)}</S.Content>
          <S.GrayWrapper>{`Written by: ${
            post.author?.name ?? "Not found"
          }`}</S.GrayWrapper>
          <CommentsSection postId={post.id} user={user} />
          <S.Footer>
            <MainButton onClick={() => navigate("/home")}>Go back</MainButton>
          </S.Footer>

          {userId && userIsAdmin && (
            <S.AdminBlock>
              <h5>Author actions</h5>
              <button onClick={() => navigate(`/posts/${userId}/edit/${postId}`)}>
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
