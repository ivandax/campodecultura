import { useState, useEffect } from "react";
import { FormWrapper, PhotoPreview } from "./CreateEditPost.Styles";
import { createPost, editPost, getPost } from "@src/persistence/post";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { notifyError, notifySuccess } from "@src/presentation/utils";
import { Spinner } from "@src/presentation/components/Spinner";
import { RadioGroup } from "@src/presentation/components/RadioGroup/RadioGroup";

function CreateEditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [photo, setPhoto] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const { userTask } = useAuthStore();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const user = userTask.status === "successful" ? userTask.data : null;

  const handleCreatePost = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
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
    });
    setIsLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    navigate("/home");
  };

  const handleEditPost = async (e: React.FormEvent) => {
    if (!user || !postId) return;
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const result = await editPost(postId, {
      title,
      content: content,
      coverImage: photo,
      editedOn: +new Date(),
      status,
    });
    setIsLoading(false);
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
      setMessage("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string); // Base64 string
    };
    reader.onerror = () => {
      setMessage("Error loading the image.");
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleGetPost = async () => {
      if (postId) {
        setIsLoadingPost(true);
        const postResult = await getPost(postId);
        setIsLoadingPost(false);
        if (postResult.error) {
          setMessage(postResult.error.message);
          return;
        }
        if (postResult.data === null) {
          setMessage("Data is null");
          return;
        }
        setTitle(postResult.data.title);
        setContent(postResult.data.content);
        setPhoto(postResult.data.coverImage);
        setStatus(postResult.data.status);
      }
    };

    handleGetPost();
  }, [postId]);

  const isEditMode = postId !== undefined;

  return (
    <FormWrapper
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
            ["image"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
        formats={["bold", "italic", "underline", "image", "list", "bullet"]}
        className="custom-quill-editor"
        readOnly={!user}
      />
      <h5>Cover image (optional)</h5>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {photo && (
        <PhotoPreview>
          <img src={photo} alt="Preview" style={{ maxWidth: "100%" }} />
        </PhotoPreview>
      )}
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
      {isEditMode && (
        <MainButton
          disabled={isLoading || !user}
          onClick={(e) => {
            e.preventDefault();
            handleEditPost(e);
          }}
        >
          {isLoading ? "Saving..." : "Save changes"}
        </MainButton>
      )}

      <MainButton type="submit" disabled={isLoading || !user}>
        {isLoading ? "Saving..." : "Save and exit"}
      </MainButton>
      {message && <p>{message}</p>}
    </FormWrapper>
  );
}

export { CreateEditPost };
