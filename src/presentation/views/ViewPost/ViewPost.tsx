import { useEffect, useState } from "react";
import {
  Wrapper,
  LoadingWrapper,
  GrayWrapper,
  Content,
  PhotoPreview,
} from "./ViewPost.Styles";
import { getPost } from "@src/persistence/post";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "@src/domain/Post";
import { timestampToHumanReadbleDate } from "@src/presentation/utils";

function ViewPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const handleGetPost = async () => {
      if (!postId) {
        setMessage("Error obteniendo el post id de params");
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
        <LoadingWrapper>Cargando...</LoadingWrapper>
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
          <GrayWrapper>{`Publicado en: ${timestampToHumanReadbleDate(
            post.createdOn,
            "es"
          )}`}</GrayWrapper>
          <Content>
            {post.content.map((paragraph, index) => {
              return <p key={index}>{paragraph}</p>;
            })}
          </Content>
          <GrayWrapper>{post.author}</GrayWrapper>
          <button onClick={() => navigate("/home")}>Volver</button>
        </>
      )}

      {message && <p>{message}</p>}
    </Wrapper>
  );
}

export { ViewPost };
