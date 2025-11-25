import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import * as S from './ViewPost.Styles';
import { getPost, deletePost } from '@src/persistence/post';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '@src/domain/Post';
import { timestampToHumanReadbleDate } from '@src/presentation/utils';
import { useAuthStore } from '@src/presentation/store/authStore';
import { DeleteButton } from '@src/presentation/components/Buttons/DeleteButton';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import { CommentsSection } from '@src/presentation/components/CommentsSection';
import { Spinner } from '@src/presentation/components/Spinner';
import { useCopyUrl } from '@src/presentation/hooks/use-copy-url';

function ViewPost() {
  const { t } = useTranslation();
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const { userTask } = useAuthStore();

  const enableCoverImage = false;

  const [deleteInput, setDeleteInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const userIsOwner =
    userTask.status === 'successful' &&
    userTask.data !== null &&
    userId &&
    userTask.data.id === userId;

  const user = userTask.status === 'successful' ? userTask.data : null;

  const handleDelete = async () => {
    if (!postId || !userIsOwner) return;
    setIsDeleting(true);
    const result = await deletePost(postId);
    setIsDeleting(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(t('viewPost.postRemoved'));
    if (userId) {
      navigate(`/posts/${userId}`);
      return;
    }
    navigate('/home');
  };

  useEffect(() => {
    const handleGetPost = async () => {
      if (!postId) {
        setMessage(t('viewPost.errorParams'));
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
  }, [postId, t]);

  const handleCopyUrl = useCopyUrl();

  return (
    <S.Wrapper>
      {!post ? (
        <S.LoadingWrapper>
          <Spinner />
        </S.LoadingWrapper>
      ) : post.status === 'draft' && !userIsOwner ? (
        <div>{t('viewPost.draftForbidden')}</div>
      ) : (
        <>
          {post.coverImage && enableCoverImage ? (
            <S.PhotoPreview>
              <img
                src={post.coverImage}
                alt={`Cover for ${post.title}`}
                style={{ maxWidth: '100%' }}
              />
            </S.PhotoPreview>
          ) : null}
          <S.Top>
            <S.Title>
              <h1>{post.title}</h1>
              <S.StatusChip
                variant={
                  post.status?.toLowerCase() === 'draft'
                    ? 'draft'
                    : post.status?.toLowerCase() === 'published'
                      ? 'published'
                      : 'default'
                }
              >
                {post.status}
              </S.StatusChip>
            </S.Title>
            <MainButton onClick={handleCopyUrl}>
              {t('viewPost.copyUrl')}
            </MainButton>
          </S.Top>
          <S.Paper>{parse(post.content)}</S.Paper>
          <S.GrayWrapper>{`${t('viewPost.editedOn')} ${timestampToHumanReadbleDate(
            post.editedOn,
            'en'
          )}`}</S.GrayWrapper>
          <S.GrayWrapper>{`${t('viewPost.writtenBy')} ${
            post.author?.name ?? t('viewPost.notFound')
          }`}</S.GrayWrapper>
          {post.acceptComments && (
            <CommentsSection postId={post.id} user={user} />
          )}
          <S.Footer>
            <MainButton onClick={() => navigate('/home')}>
              {t('viewPost.goBack')}
            </MainButton>
          </S.Footer>

          {userId && userIsOwner && (
            <S.AdminBlock>
              <h5>{t('viewPost.authorActions')}</h5>
              <MainButton
                onClick={() => navigate(`/posts/${userId}/edit/${postId}`)}
              >
                {t('viewPost.editPost')}
              </MainButton>
              <h5
                style={{
                  marginTop: '24px',
                  padding: '8px',
                  width: '100%',
                }}
              >
                {t('viewPost.deletePost')}
              </h5>
              <S.VisuallyHiddenLabel htmlFor="delete-post-input">
                {t('viewPost.deleteConfirm')}
              </S.VisuallyHiddenLabel>
              <input
                id="delete-post-input"
                type="text"
                placeholder={t('viewPost.deletePlaceholder')}
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                style={{
                  padding: '8px',
                }}
              />
              <DeleteButton
                isDeleting={isDeleting}
                deleteInput={deleteInput}
                handleDelete={handleDelete}
              />
            </S.AdminBlock>
          )}
        </>
      )}

      {message && <p>{message}</p>}
    </S.Wrapper>
  );
}

export { ViewPost };
