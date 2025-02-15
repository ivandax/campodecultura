import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { Outlet } from "react-router-dom";
import { Main, Wrapper, MessageWrapper, LoadingWrapper } from "./Home.Styles";
import { HomeTable } from "@src/presentation/components/HomeTable";
import { getPosts } from "@src/persistence/post";
import { useEffect, useState } from "react";
import { Post } from "@src/domain/Post";
import { useAuthStore } from "@src/presentation/store/authStore";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const appUser = useAuthStore((state) => state.user);

  const isAdmin = appUser && appUser.role === "ADMIN" ? true : false;

  useEffect(() => {
    const handleGetPosts = async () => {
      setIsLoading(true);
      const posts = await getPosts(isAdmin);
      setIsLoading(false);

      if (posts.error) {
        setMessage("Error cargando publicaciones");
        return;
      }
      setPosts(posts.data);
    };
    handleGetPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Main>
        <ViewTitle>Posts</ViewTitle>
        {isLoading && <LoadingWrapper>Loading...</LoadingWrapper>}
        {message && <MessageWrapper>{message}</MessageWrapper>}
        {posts && <HomeTable posts={posts} />}
      </Main>
      <Outlet />
    </Wrapper>
  );
}

export { Home };
