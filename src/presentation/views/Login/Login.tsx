import { useState } from "react";
import { LoginFormWrapper } from "./Login.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userTask } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userOrNull = await login(email, password);
    if (userOrNull) {
      navigate("/home");
    }
  };

  return (
    <LoginFormWrapper onSubmit={handleLogin}>
      <h5>Log in</h5>
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
        placeholder="Password"
        required
      />
      <button type="submit" disabled={userTask.status === "in-progress"}>
        {userTask.status === "in-progress" ? "Logging in..." : "Log in"}
      </button>
      {userTask.status === "failed" && <p>{userTask.error.message}</p>}
    </LoginFormWrapper>
  );
}

export { Login };
