import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { notifyError, notifySuccess } from "@src/presentation/utils";
import * as S from "./VerifyEmail.Styles";
import { verifyEmail } from "@src/persistence/auth";

function VerifyEmail() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verify = async () => {
      const oobCode = searchParams.get("oobCode");

      if (!oobCode) {
        notifyError("Invalid verification link.");
        return;
      }

      try {
        await verifyEmail(oobCode);
        notifySuccess("Your email has been verified!");
      } catch (err) {
        notifyError("Verification failed.");
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <S.Wrapper>Verifying your email…</S.Wrapper>;
}

export { VerifyEmail };
