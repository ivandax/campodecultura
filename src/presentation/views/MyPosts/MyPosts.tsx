import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { Outlet, useParams } from "react-router-dom";
import { Main, Wrapper, LoadingWrapper } from "./MyPosts.Styles";
import { PostsTable } from "@src/presentation/components/PostsTable";
import { useAuthStore } from "@src/presentation/store/authStore";
import { Spinner } from "@src/presentation/components/Spinner";
import { NotificationBanner } from "@src/presentation/components/Banner/Banner";

function MyPosts() {
  const { userTask } = useAuthStore((state) => state);
  const { userId } = useParams();

  if (!userId) {
    return (
      <Main>
        <ViewTitle>User ID is missing</ViewTitle>
      </Main>
    );
  }

  return (
    <Wrapper>
      <Main>
        <ViewTitle>Posts</ViewTitle>
        {userTask.status === "pending" || userTask.status === "in-progress" ? (
          <LoadingWrapper>
            <Spinner />
          </LoadingWrapper>
        ) : userTask.status === "successful" ? (
          <>
            {userTask.data?.emailVerified === false && (
              <NotificationBanner visible={true} />
            )}
            <PostsTable
              isOwner={userTask.data?.id === userId}
              userId={userId}
            />
          </>
        ) : null}
      </Main>
      <Outlet />
    </Wrapper>
  );
}

export { MyPosts };
