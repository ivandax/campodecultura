import { useState } from "react";
import { SignUpFormWrapper } from "./SignUp.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const { signup, error, isLoading } = useAuthStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const maybeError = await signup(email, password);
    if (!maybeError) {
      setMessage("Cuenta creada. Revise su correo para verificar la cuenta");
    }
  };

  return (
    <SignUpFormWrapper onSubmit={handleSignup}>
      <h5>Crear cuenta</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
      {error && <p>{error.message}</p>}
      {message && <p>{message}</p>}
    </SignUpFormWrapper>
  );
}

export { SignUp };
