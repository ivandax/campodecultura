import { useState } from "react";
import { FormWrapper, PhotoPreview } from "./CreatePost.Styles";
import { createPost } from "@src/persistence/post";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useNavigate } from "react-router-dom";
import { Content } from "@src/domain/Post";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<Content[]>([
    { type: "text", content: "" },
  ]);
  const [photo, setPhoto] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleAddParagraph = () => {
    setContent([...content, { type: "text", content: "" }]);
  };

  const handleContentChange = (index: number, newContent: string) => {
    setContent((prevParagraphs: Content[]) =>
      prevParagraphs.map((paragraph, i) =>
        i === index && paragraph.type === "text"
          ? { ...paragraph, content: newContent }
          : paragraph
      )
    );
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const result = await createPost({
      title,
      content,
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
      {content.map((item, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          {item.type === "text" ? (
            <textarea
              value={item.content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              rows={4}
              cols={50}
              placeholder={`Paragraph ${index + 1}`}
            />
          ) : item.type === "image" ? (
            <div>
              <img
                src={item.src}
                alt={`Paragraph ${index + 1}`}
                style={{ maxWidth: "100%", marginBottom: "0.5rem" }}
              />
              <input
                type="text"
                value={item.src}
                onChange={() => void 0}
                placeholder="Image URL"
                style={{ width: "100%" }}
              />
            </div>
          ) : null}
        </div>
      ))}
      <button type="button" onClick={handleAddParagraph}>
        Add Text Paragraph
      </button>

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
