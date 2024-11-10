import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { Outlet } from "react-router-dom";
import { Main, Wrapper, MessageWrapper, LoadingWrapper } from "./Home.Styles";
import { HomeTable } from "@src/presentation/components/HomeTable";
import { getPosts } from "@src/persistence/post";
import { useEffect, useState } from "react";
import { Post } from "@src/domain/Post";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const handleGetPosts = async () => {
      setIsLoading(true);
      const posts = await getPosts();
      setIsLoading(false);

      if (posts.error) {
        setMessage("Error cargando publicaciones");
        return;
      }
      setPosts(posts.data);
    };
    handleGetPosts();
  }, []);

  return (
    <Wrapper>
      <Main>
        <ViewTitle>Campo de Cultura</ViewTitle>
        {isLoading && <LoadingWrapper>Cargando...</LoadingWrapper>}
        {message && <MessageWrapper>{message}</MessageWrapper>}
        {posts && <HomeTable posts={posts} />}
      </Main>
      <Outlet />
    </Wrapper>
  );
}

export { Home };
