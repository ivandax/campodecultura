import { useState } from "react";
import { LoginFormWrapper } from "./Login.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "@src/presentation/utils";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { GoogleSignInButton } from "@src/presentation/components/Buttons/GoogleSignInButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userTask, loginWithGoogle } = useAuthStore();
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

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginWithGoogle();
    if (user) {
      navigate("/home");
    } else {
      notifyError("Could not log in with Google.");
    }
  };

  return (
    <LoginFormWrapper>
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
      <MainButton
        disabled={userTask.status === "in-progress"}
        onClick={handleLogin}
      >
        {userTask.status === "in-progress" ? "Logging in..." : "Log in with email"}
      </MainButton>
      <GoogleSignInButton onClick={handleGoogleLogin} />
      <Link to="/recover-password">Forgot password?</Link>
    </LoginFormWrapper>
  );
}

export { Login };
