import { useState } from "react";
import { FormWrapper, PhotoPreview } from "./CreatePost.Styles";
import { createPost } from "@src/persistence/post";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCreatePost = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const result = await createPost({
      title,
      content: content.split("\n"),
      createdOn: +new Date(),
      author: user.email,
      coverImage: photo,
    });
    setIsLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    navigate("/home");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string); // Base64 string
    };
    reader.onerror = () => {
      setMessage("Error loading the image.");
    };
    reader.readAsDataURL(file); // Convert to Base64
  };

  return (
    <FormWrapper onSubmit={handleCreatePost}>
      <h5>Crear publicación</h5>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido"
        rows={24}
        required
      />
      <h5>Cover image (optional)</h5>
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {photo && (
        <PhotoPreview>
          <img src={photo} alt="Preview" style={{ maxWidth: "100%" }} />
        </PhotoPreview>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
      {message && <p>{message}</p>}
    </FormWrapper>
  );
}

export { CreatePost };
