import { useState } from "react";
import { FormWrapper } from "./CreatePost.Styles";
import { createPost } from "@src/persistence/post";
import { useAuthStore } from "@src/presentation/store/authStore";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const { user } = useAuthStore();

  const handleCreatePost = async (e: React.FormEvent) => {
    if (!user) return;
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const result = await createPost({
      title,
      content: [content],
      createdOn: +new Date(),
      author: user.email,
    });
    setIsLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setMessage("Creado!");
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
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
      {message && <p>{message}</p>}
    </FormWrapper>
  );
}

export { CreatePost };
