import { ViewTitle } from '@src/presentation/components/ViewTitle';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';
import * as S from './MyPosts.Styles';
import { PostsTable } from '@src/presentation/components/PostsTable';
import { useAuthStore } from '@src/presentation/store/authStore';
import { Spinner } from '@src/presentation/components/Spinner';
import { NotificationBanner } from '@src/presentation/components/Banner/Banner';
import { useCopyUrl } from '@src/presentation/hooks/use-copy-url';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';

function MyPosts() {
  const { t } = useTranslation();
  const { userTask } = useAuthStore((state) => state);
  const { userId } = useParams();

  const handleCopyUrl = useCopyUrl();

  if (!userId) {
    return (
      <S.Main>
        <ViewTitle>{t('myPosts.userIdMissing')}</ViewTitle>
      </S.Main>
    );
  }

  return (
    <S.Wrapper>
      <S.Main>
        <S.Top>
          <ViewTitle>
            {userTask.status === 'successful'
              ? t('myPosts.title', { userName: userTask.data?.name })
              : t('myPosts.titlePlaceholder')}
          </ViewTitle>
          <MainButton onClick={handleCopyUrl}>
            {t('myPosts.copyUrl')}
          </MainButton>
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
