import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './CreateEditPost.Styles';
import { createPost, editPost, getPost } from '@src/persistence/post';
import { useAuthStore } from '@src/presentation/store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import { ConfirmationModal } from '@src/presentation/components/ConfirmationModal/ConfirmationModal';
import { notifyError, notifySuccess } from '@src/presentation/utils';
import { Spinner } from '@src/presentation/components/Spinner';
import { RadioGroup } from '@src/presentation/components/RadioGroup/RadioGroup';
import { NotificationBanner } from '@src/presentation/components/Banner/Banner';

function CreateEditPost() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [acceptComments, setAcceptComments] = useState(false);
  const [photo, setPhoto] = useState<null | string>(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const { userTask } = useAuthStore();
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  // Track initial values for unsaved changes detection
  const initialValuesRef = useRef({
    title: '',
    content: '',
    status: 'draft',
    acceptComments: false,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const enableCoverImage = false;

  const user = userTask.status === 'successful' ? userTask.data : null;

  const handleCreatePost = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();
    setIsLoadingCreate(true);
    const result = await createPost({
      title,
      content: content,
      createdOn: +new Date(),
      editedOn: +new Date(),
      coverImage: photo,
      language: 'en',
      categories: [],
      status: status,
      authorId: user.id,
      acceptComments: acceptComments,
    });
    setIsLoadingCreate(false);
    if (result.error) {
      notifyError(result.error.message);
      return;
    }
    if (userId) {
      navigate(`/posts/${userId}`);
      return;
    }
    navigate('/home');
  };

  const handleEditPost = async (e: React.FormEvent) => {
    if (!user || !postId) return;
    e.preventDefault();
    setIsLoadingEdit(true);
    const result = await editPost(postId, {
      title,
      content: content,
      coverImage: photo,
      editedOn: +new Date(),
      status,
      acceptComments,
    });
    setIsLoadingEdit(false);
    if (result.error) {
      notifyError(t('createEditPost.errorSaving'));
      return;
    }
    // Set ref values for prevent unsaved changes prompt
    initialValuesRef.current = {
      title,
      content,
      status,
      acceptComments,
    };
    notifySuccess(t('createEditPost.successEdit'));
  };

  const handleEditPostAndNavigateAway = async (e: React.FormEvent) => {
    await handleEditPost(e);
    navigate('/home');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      notifyError(t('createEditPost.errorImageSize'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string); // Base64 string
    };
    reader.onerror = () => {
      notifyError(t('createEditPost.errorImageLoad'));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPhoto(null);
    setStatus('draft');
    setAcceptComments(false);
  };

  useEffect(() => {
    const handleGetPost = async () => {
      if (!user) return;

      if (!postId) {
        resetForm();
        return;
      }

      setIsLoadingPost(true);
      const postResult = await getPost(postId);
      setIsLoadingPost(false);
      if (postResult.error) {
        notifyError(postResult.error.message);
        return;
      }
      if (postResult.data === null) {
        notifyError(t('createEditPost.errorDataNull'));
        return;
      }
      if (postResult.data.author?.id !== user.id) {
        notifyError(t('createEditPost.errorOwner'));
        return;
      }
      setTitle(postResult.data.title);
      setContent(postResult.data.content);
      setPhoto(postResult.data.coverImage);
      setStatus(postResult.data.status);
      setAcceptComments(postResult.data?.acceptComments ?? false);
      // Save initial values for unsaved changes detection
      initialValuesRef.current = {
        title: postResult.data.title,
        content: postResult.data.content,
        status: postResult.data.status,
        acceptComments: postResult.data?.acceptComments ?? false,
      };
    };

    handleGetPost();
  }, [postId, user, userId, t]);

  const isEditMode = postId !== undefined;

  useEffect(() => {
    const editor = document.querySelector('.ql-editor');
    if (!editor) return;

    const handlePaste = (e: Event) => {
      const evt = e as ClipboardEvent;

      if (evt.clipboardData?.files?.length) {
        notifyError(t('createEditPost.errorPasteFiles'));
        evt.preventDefault();
      }

      const html = evt.clipboardData?.getData('text/html');
      if (html && html.includes('<img')) {
        notifyError(t('createEditPost.errorPasteImages'));
        evt.preventDefault();
      }
    };

    editor.addEventListener('paste', handlePaste);
    return () => editor.removeEventListener('paste', handlePaste);
  }, [t]);

  // Check for unsaved changes
  const hasUnsavedChanges =
    title !== initialValuesRef.current.title ||
    content !== initialValuesRef.current.content ||
    status !== initialValuesRef.current.status ||
    acceptComments !== initialValuesRef.current.acceptComments;

  // Handler for view post button
  const handleViewPostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasUnsavedChanges) {
      setShowConfirmModal(true);
    } else {
      navigate(`/posts/${userId}/view/${postId}`);
    }
  };

  const handleConfirmNavigate = () => {
    setShowConfirmModal(false);
    navigate(`/posts/${userId}/view/${postId}`);
  };

  const handleCancelNavigate = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      {user?.emailVerified === false && <NotificationBanner visible={true} />}
      <S.FormWrapper
        onSubmit={isEditMode ? handleEditPostAndNavigateAway : handleCreatePost}
      >
        <h5>
          {isEditMode
            ? t('createEditPost.editTitle')
            : t('createEditPost.createTitle')}
        </h5>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('createEditPost.titlePlaceholder')}
          required
          disabled={isLoadingPost || !user}
        />
        {isLoadingPost && <Spinner />}
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          }}
          formats={['bold', 'italic', 'underline', 'image', 'list', 'bullet']}
          className="custom-quill-editor"
          readOnly={!user}
        />
        {enableCoverImage && (
          <>
            <h5>{t('createEditPost.coverImage')}</h5>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {photo && (
              <S.PhotoPreview>
                <img src={photo} alt="Preview" style={{ maxWidth: '100%' }} />
              </S.PhotoPreview>
            )}
          </>
        )}
        <S.ConfigurationSection>
          <S.ConfigurationBlock>
            <div>
              <h5>{t('createEditPost.visibility')}</h5>
              <RadioGroup
                name="status"
                options={[
                  { label: t('createEditPost.draft'), value: 'draft' },
                  { label: t('createEditPost.published'), value: 'published' },
                ]}
                selectedValue={status}
                onChange={setStatus}
                color="#ffffff"
                backgroundColor="#007bff"
                borderColor="#007bff"
              />
            </div>
            <S.ConfigurationMessage>
              {status === 'published'
                ? t('createEditPost.publishedDesc')
                : t('createEditPost.draftDesc')}
            </S.ConfigurationMessage>
          </S.ConfigurationBlock>
          <S.ConfigurationBlock>
            <div>
              <h5>{t('createEditPost.commentsConfig')}</h5>
              <RadioGroup
                name="comments-configuration"
                options={[
                  {
                    label: t('createEditPost.acceptComments'),
                    value: 'accept-comments',
                  },
                  {
                    label: t('createEditPost.commentsDisabled'),
                    value: 'comments-disabled',
                  },
                ]}
                selectedValue={
                  acceptComments ? 'accept-comments' : 'comments-disabled'
                }
                onChange={(value) =>
                  setAcceptComments(value === 'accept-comments')
                }
                color="#ffffff"
                backgroundColor="#007bff"
                borderColor="#007bff"
              />
            </div>
          </S.ConfigurationBlock>
        </S.ConfigurationSection>

        <S.ActionsSection>
          {isEditMode ? (
            <>
              <MainButton
                disabled={isLoadingEdit || !user}
                onClick={(e) => {
                  e.preventDefault();
                  handleEditPost(e);
                }}
              >
                {isLoadingEdit
                  ? t('createEditPost.saving')
                  : t('createEditPost.saveChanges')}
              </MainButton>
              <MainButton
                disabled={isLoadingEdit || !user || !postId}
                onClick={handleViewPostClick}
              >
                {t('createEditPost.viewPost')}
              </MainButton>
            </>
          ) : (
            <MainButton type="submit" disabled={isLoadingCreate || !user}>
              {isLoadingCreate
                ? t('createEditPost.saving')
                : t('createEditPost.saveAndExit')}
            </MainButton>
          )}
        </S.ActionsSection>
      </S.FormWrapper>
      {showConfirmModal && (
        <ConfirmationModal
          title={t('createEditPost.unsavedTitle')}
          description={t('createEditPost.unsavedDesc')}
          onConfirm={handleConfirmNavigate}
          onCancel={handleCancelNavigate}
        />
      )}
    </>
  );
}

export { CreateEditPost };
