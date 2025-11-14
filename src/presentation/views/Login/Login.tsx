import { useState } from "react";
import { LoginFormWrapper } from "./Login.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "@src/presentation/utils";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userTask } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/home");
    } else {
      notifyError("Could not log in. Please check your credentials.");
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
      <MainButton type="submit" disabled={userTask.status === "in-progress"}>
        {userTask.status === "in-progress" ? "Logging in..." : "Log in"}
      </MainButton>
      <Link to="/recover-password">Forgot password?</Link>
    </LoginFormWrapper>
  );
}

export { Login };
