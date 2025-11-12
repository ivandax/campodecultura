import { getUser, updateUser } from "@src/persistence/user";
import * as S from "./MyProfile.Styles";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { useAuthStore } from "@src/presentation/store/authStore";
import { notifyError, notifySuccess } from "@src/presentation/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppUser } from "@src/domain/AppUser";

function MyProfile() {
  const navigate = useNavigate();
  const { userTask, logout } = useAuthStore();
  const user = userTask.status === "successful" ? userTask.data : null;
  const [userProfile, setUserProfile] = useState<null | AppUser>(null);

  const handleGetProfile = useCallback(
    async (id: string) => {
      const result = await getUser(id);
      if (result.error) {
        notifyError("Error getting user");
        return;
      }
      if (result.data === null) {
        notifyError("Error getting user = null");
        return;
      }
      setUserProfile(result.data);
    },
    [setUserProfile] // Dependencies
  );

  useEffect(() => {
    if (user) {
      handleGetProfile(user.id);
    }
  }, [user, handleGetProfile]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNameBlur = useCallback(async () => {
    if (userProfile) {
      const result = await updateUser(
        { name: userProfile.name },
        userProfile.id
      );
      if (result.error) {
        notifyError("Error updating user name");
        return;
      }
      notifySuccess("User name updated successfully");
    }
  }, [userProfile]);

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
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) =>
                setUserProfile({ ...userProfile, name: e.target.value })
              }
              placeholder="Display name"
              onBlur={handleNameBlur}
            />
          )}
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
