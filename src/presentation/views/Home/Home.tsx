import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { Outlet } from "react-router-dom";
import { Main, Wrapper, LoadingWrapper } from "./Home.Styles";
import { HomeTable } from "@src/presentation/components/HomeTable";
import { useAuthStore } from "@src/presentation/store/authStore";

function Home() {
  const { user, isLoading } = useAuthStore((state) => state);

  const isAdmin = user && user.role === "ADMIN" ? true : false;

  return (
    <Wrapper>
      <Main>
        <ViewTitle>Posts</ViewTitle>
        {isLoading ? (
          <LoadingWrapper>Loading...</LoadingWrapper>
        ) : (
          <HomeTable isAdmin={isAdmin} />
        )}
      </Main>
      <Outlet />
    </Wrapper>
  );
}

export { Home };
