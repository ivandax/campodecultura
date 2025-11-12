import { useState } from "react";
import { SignUpFormWrapper } from "./SignUp.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";
import { notifySuccess } from "@src/presentation/utils";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, userTask } = useAuthStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const maybeError = await signup(email, password);
    if (!maybeError) {
      notifySuccess("Account created. Please check your email to verify.");
    }
  };

  return (
    <SignUpFormWrapper onSubmit={handleSignup}>
      <h5>Create account</h5>
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
        {userTask.status === "in-progress" ? "Creating..." : "Create account"}
      </button>
      {userTask.status === "failed" && <p>{userTask.error.message}</p>}
    </SignUpFormWrapper>
  );
}

export { SignUp };
