import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./SetNewPassword.Styles";
import { notifyError, notifySuccess } from "@src/presentation/utils";
import {
  completePasswordReset,
  verifyPasswordCode,
} from "@src/persistence/auth";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";

function SetNewPassword() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!oobCode) {
        notifyError("Invalid password reset link.");
        navigate("/");
        return;
      }

      try {
        await verifyPasswordCode(oobCode);
      } catch {
        notifyError("Password reset link is invalid or expired.");
        navigate("/");
      }

      setIsVerifying(false);
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oobCode) return;

    if (newPassword.length < 6) {
      notifyError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    const result = await completePasswordReset(oobCode, newPassword);

    setIsSubmitting(false);

    if (result.error) {
      notifyError("Could not reset password.");
      return;
    }

    notifySuccess("Password updated successfully! You can now log in.");
  };

  if (isVerifying) {
    return <S.Wrapper>Verifying reset link…</S.Wrapper>;
  }

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <h5>Create a new password</h5>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        required
      />

      <MainButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Set Password"}
      </MainButton>
    </S.Wrapper>
  );
}

export { SetNewPassword };
