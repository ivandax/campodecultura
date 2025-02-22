import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { Outlet } from "react-router-dom";
import { Main, Wrapper, LoadingWrapper } from "./Home.Styles";
import { HomeTable } from "@src/presentation/components/HomeTable";
import { useAuthStore } from "@src/presentation/store/authStore";

function Home() {
  const { userTask } = useAuthStore((state) => state);

  const isAdmin =
    userTask.status === "successful" && userTask.data?.role === "ADMIN"
      ? true
      : false;

  return (
    <Wrapper>
      <Main>
        <ViewTitle>Posts</ViewTitle>
        {userTask.status === "pending" || userTask.status === "in-progress" ? (
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
