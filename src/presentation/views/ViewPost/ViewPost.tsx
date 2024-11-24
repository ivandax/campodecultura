import { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  Wrapper,
  LoadingWrapper,
  GrayWrapper,
  Content,
  PhotoPreview,
  AdminBlock,
} from "./ViewPost.Styles";
import { getPost, deletePost } from "@src/persistence/post";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "@src/domain/Post";
import { timestampToHumanReadbleDate } from "@src/presentation/utils";
import { useAuthStore } from "@src/presentation/store/authStore";
import { DeleteButton } from "@src/presentation/components/Buttons/DeleteButton/DeleteButton";

function ViewPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuthStore();

  // ADMIN
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!postId || user?.role !== "ADMIN") return;
    setIsDeleting(true);
    const result = await deletePost(postId);
    setIsDeleting(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("Post removed");
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
    <Wrapper>
      {!post ? (
        <LoadingWrapper>Loading...</LoadingWrapper>
      ) : (
        <>
          {post.coverImage ? (
            <PhotoPreview>
              <img
                src={post.coverImage}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            </PhotoPreview>
          ) : null}
          <h4>{post.title}</h4>
          <GrayWrapper>{`Published on: ${timestampToHumanReadbleDate(
            post.createdOn,
            "es"
          )}`}</GrayWrapper>
          <Content>{parse(post.content)}</Content>
          <GrayWrapper>{`Written by: ${post.author}`}</GrayWrapper>
          <button onClick={() => navigate("/home")}>Go back</button>
          <hr></hr>
          {user?.role === "ADMIN" && (
            <AdminBlock>
              <h5>ADMIN actions</h5>
              <input
                type="text"
                placeholder="Write 'delete' to enable button"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
              />
              <DeleteButton
                isDeleting={isDeleting}
                deleteInput={deleteInput}
                handleDelete={handleDelete}
              />
            </AdminBlock>
          )}
        </>
      )}

      {message && <p>{message}</p>}
    </Wrapper>
  );
}

export { ViewPost };
