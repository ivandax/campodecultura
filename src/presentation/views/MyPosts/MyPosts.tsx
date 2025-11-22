import { ViewTitle } from '@src/presentation/components/ViewTitle';
import { Outlet, useParams } from 'react-router-dom';
import * as S from './MyPosts.Styles';
import { PostsTable } from '@src/presentation/components/PostsTable';
import { useAuthStore } from '@src/presentation/store/authStore';
import { Spinner } from '@src/presentation/components/Spinner';
import { NotificationBanner } from '@src/presentation/components/Banner/Banner';
import { useCopyUrl } from '@src/presentation/hooks/use-copy-url';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';

function MyPosts() {
  const { userTask } = useAuthStore((state) => state);
  const { userId } = useParams();

  const handleCopyUrl = useCopyUrl();

  if (!userId) {
    return (
      <S.Main>
        <ViewTitle>User ID is missing</ViewTitle>
      </S.Main>
    );
  }

  return (
    <S.Wrapper>
      <S.Main>
        <S.Top>
          <ViewTitle>Posts</ViewTitle>
          <MainButton onClick={handleCopyUrl}>Copy URL</MainButton>
        </S.Top>

        {userTask.status === 'pending' || userTask.status === 'in-progress' ? (
          <S.LoadingWrapper>
            <Spinner />
          </S.LoadingWrapper>
        ) : userTask.status === 'successful' ? (
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
      </S.Main>
      <Outlet />
    </S.Wrapper>
  );
}

export { MyPosts };
