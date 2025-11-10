import * as S from "./MyProfile.Styles";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const { userTask, logout } = useAuthStore();
  const user = userTask.status === "successful" ? userTask.data : null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <S.Wrapper>
      <S.HeaderSection>
        <S.Title>My Profile</S.Title>
        <S.Subtitle>Manage your account</S.Subtitle>
      </S.HeaderSection>

      {user ? (
        <S.ProfileInfo>
          <S.InfoLine>
            <strong>Email:</strong> {user.email}
          </S.InfoLine>
        </S.ProfileInfo>
      ) : (
        <p>Loading user data...</p>
      )}

      <S.ActionBlock>
        <MainButton onClick={handleLogout}>Log out</MainButton>
      </S.ActionBlock>
    </S.Wrapper>
  );
}

export { MyProfile };
