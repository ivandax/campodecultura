import { getUser, updateUser } from "@src/persistence/user";
import * as S from "./MyProfile.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";
import { notifyError, notifySuccess } from "@src/presentation/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppUser } from "@src/domain/AppUser";

// MyProfile.tsx
function MyProfile() {
  const navigate = useNavigate();
  const { userTask, logout } = useAuthStore();
  const user = userTask.status === "successful" ? userTask.data : null;
  const [userProfile, setUserProfile] = useState<null | AppUser>(null);
  const [displayName, setDisplayName] = useState("");

  const handleGetProfile = useCallback(async (id: string) => {
    const result = await getUser(id);
    if (result.error || result.data === null) {
      notifyError("Error getting user");
      return;
    }
    setUserProfile(result.data);
    setDisplayName(result.data.name);
  }, []);

  useEffect(() => {
    if (user) handleGetProfile(user.id);
  }, [user, handleGetProfile]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNameBlur = useCallback(async () => {
    if (!userProfile || displayName === userProfile.name) return;
    if (userProfile) {
      const result = await updateUser({ name: displayName }, userProfile.id);
      if (result.error) {
        notifyError("Error updating user name");
      } else {
        notifySuccess("User name updated successfully");
      }
    }
  }, [displayName, userProfile]);

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
          {userProfile && (
            <S.Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              onBlur={handleNameBlur}
            />
          )}
        </S.ProfileInfo>
      ) : (
        <p>Loading user data...</p>
      )}

      <S.Divider />

      <S.LogoutSection>
        <S.LogoutText>Logging out will end your current session.</S.LogoutText>
        <S.LogoutButton onClick={handleLogout}>Log out</S.LogoutButton>
      </S.LogoutSection>
    </S.Wrapper>
  );
}

export { MyProfile };
