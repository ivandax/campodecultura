import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { Outlet } from "react-router-dom";
import * as S from "./News.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";
import { Spinner } from "@src/presentation/components/Spinner";
import { Bbc } from "./bbc";

function News() {
  const { userTask } = useAuthStore((state) => state);

  return (
    <S.Wrapper>
      <S.Main>
        <ViewTitle>Posts</ViewTitle>
        {userTask.status === "pending" || userTask.status === "in-progress" ? (
          <S.LoadingWrapper>
            <Spinner />
          </S.LoadingWrapper>
        ) : (
          <S.NewsWrapper>
            <Bbc />
          </S.NewsWrapper>
        )}
      </S.Main>
      <Outlet />
    </S.Wrapper>
  );
}

export { News };
