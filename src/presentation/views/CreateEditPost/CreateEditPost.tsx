import { useState, useEffect } from "react";
import * as S from "./CreateEditPost.Styles";
import { createPost, editPost, getPost } from "@src/persistence/post";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { notifyError, notifySuccess } from "@src/presentation/utils";
import { Spinner } from "@src/presentation/components/Spinner";
import { RadioGroup } from "@src/presentation/components/RadioGroup/RadioGroup";
import { NotificationBanner } from "@src/presentation/components/Banner/Banner";

function CreateEditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [acceptComments, setAcceptComments] = useState(false);
  const [photo, setPhoto] = useState<null | string>(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const { userTask } = useAuthStore();
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const enableCoverImage = false;

  const user = userTask.status === "successful" ? userTask.data : null;

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
      language: "en",
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
    navigate("/home");
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
      notifyError("Something went wrong while saving.");
      return;
    }
    notifySuccess("Successfully edited the post");
  };

  const handleEditPostAndNavigateAway = async (e: React.FormEvent) => {
    await handleEditPost(e);
    navigate("/home");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      notifyError("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string); // Base64 string
    };
    reader.onerror = () => {
      notifyError("Error loading the image.");
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleGetPost = async () => {
      if (!user) return;
      if (postId) {
        setIsLoadingPost(true);
        const postResult = await getPost(postId);
        setIsLoadingPost(false);
        if (postResult.error) {
          notifyError(postResult.error.message);
          return;
        }
        if (postResult.data === null) {
          notifyError("Data is null");
          return;
        }
        if (postResult.data.author?.id !== user.id) {
          notifyError("Post does not belong to the user");
          return;
        }
        setTitle(postResult.data.title);
        setContent(postResult.data.content);
        setPhoto(postResult.data.coverImage);
        setStatus(postResult.data.status);
        setAcceptComments(postResult.data?.acceptComments ?? false);
      }
    };

    handleGetPost();
  }, [postId, user, userId]);

  const isEditMode = postId !== undefined;

  return (
    <>
      {user?.emailVerified === false && <NotificationBanner visible={true} />}
      <S.FormWrapper
        onSubmit={isEditMode ? handleEditPostAndNavigateAway : handleCreatePost}
      >
        <h5>{isEditMode ? "Edit post" : "Create post"}</h5>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          disabled={isLoadingPost || !user}
        />
        {isLoadingPost && <Spinner />}
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          }}
          formats={["bold", "italic", "underline", "image", "list", "bullet"]}
          className="custom-quill-editor"
          readOnly={!user}
        />
        {enableCoverImage && (
          <>
            <h5>Cover image (optional)</h5>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {photo && (
              <S.PhotoPreview>
                <img src={photo} alt="Preview" style={{ maxWidth: "100%" }} />
              </S.PhotoPreview>
            )}
          </>
        )}
        <S.ConfigurationSection>
          <div>
            <h5>Visibility</h5>
            <RadioGroup
              name="status"
              options={[
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
              ]}
              selectedValue={status}
              onChange={setStatus}
              color="#ffffff"
              backgroundColor="#007bff"
              borderColor="#007bff"
            />
          </div>
          <div>
            <h5>Comments configuration</h5>
            <RadioGroup
              name="comments-configuration"
              options={[
                { label: "Accept comments", value: "accept-comments" },
                { label: "Comments disabled", value: "comments-disabled" },
              ]}
              selectedValue={
                acceptComments ? "accept-comments" : "comments-disabled"
              }
              onChange={(value) =>
                setAcceptComments(value === "accept-comments")
              }
              color="#ffffff"
              backgroundColor="#007bff"
              borderColor="#007bff"
            />
          </div>
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
                {isLoadingEdit ? "Saving..." : "Save changes"}
              </MainButton>
              <MainButton
                disabled={isLoadingEdit || !user || !postId}
                onClick={() => navigate(`/posts/${userId}/view/${postId}`)}
              >
                View post
              </MainButton>
            </>
          ) : (
            <MainButton type="submit" disabled={isLoadingCreate || !user}>
              {isLoadingCreate ? "Saving..." : "Save and exit"}
            </MainButton>
          )}
        </S.ActionsSection>
      </S.FormWrapper>
    </>
  );
}

export { CreateEditPost };
