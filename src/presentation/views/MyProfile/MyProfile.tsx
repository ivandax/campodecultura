import { getUser, updateUser } from '@src/persistence/user';
import * as S from './MyProfile.Styles';
import { useAuthStore } from '@src/presentation/store/authStore';
import { notifyError, notifySuccess } from '@src/presentation/utils';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppUser } from '@src/domain/AppUser';
import { useLanguageStore } from '@src/presentation/store/languageStore';
import { Dropdown } from '@src/presentation/components/Dropdown';
import { useTranslation } from 'react-i18next';

// MyProfile.tsx
function MyProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userTask, logout } = useAuthStore();
  const user = userTask.status === 'successful' ? userTask.data : null;
  const [userProfile, setUserProfile] = useState<null | AppUser>(null);
  const [displayName, setDisplayName] = useState('');
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const updateSelectedLanguage = useLanguageStore(
    (state) => state.updateSelectedLanguage
  );

  const handleGetProfile = useCallback(async (id: string) => {
    const result = await getUser(id);
    if (result.error || result.data === null) {
      notifyError(t('myProfile.errorGettingUser'));
      return;
    }
    setUserProfile(result.data);
    setDisplayName(result.data.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) handleGetProfile(user.id);
  }, [user, handleGetProfile]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNameBlur = useCallback(async () => {
    if (!userProfile || displayName === userProfile.name) return;
    if (userProfile) {
      const result = await updateUser({ name: displayName }, userProfile.id);
      if (result.error) {
        notifyError(t('myProfile.errorUpdatingName'));
      } else {
        notifySuccess(t('myProfile.successUpdatingName'));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayName, userProfile]);

  const languageOptions = [
    { value: 'en', label: t('myProfile.languages.en') },
    { value: 'es', label: t('myProfile.languages.es') },
    { value: 'fr', label: t('myProfile.languages.fr') },
  ];

  const handleUpdateLanguage = (value: string | number) => {
    if (value === 'es' || value === 'en' || value === 'fr') {
      updateSelectedLanguage(value);
    }
  };

  return (
    <S.Wrapper>
      <S.HeaderSection>
        <S.Title>{t('myProfile.title')}</S.Title>
        <S.Subtitle>{t('myProfile.subtitle')}</S.Subtitle>
      </S.HeaderSection>

      {user ? (
        <S.ProfileInfo>
          <S.InfoLine>
            <strong>{t('myProfile.email')}</strong> {user.email}
          </S.InfoLine>
          {userProfile && (
            <>
              <S.Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t('myProfile.displayNamePlaceholder')}
                onBlur={handleNameBlur}
              />
              <Dropdown
                options={languageOptions}
                onChange={handleUpdateLanguage}
                selectedValue={selectedLanguage}
              />
            </>
          )}
        </S.ProfileInfo>
      ) : (
        <p>{t('myProfile.loading')}</p>
      )}

      <S.Divider />

      <S.LogoutSection>
        <S.LogoutText>{t('myProfile.logoutWarning')}</S.LogoutText>
        <S.LogoutButton onClick={handleLogout}>
          {t('myProfile.logoutButton')}
        </S.LogoutButton>
      </S.LogoutSection>
    </S.Wrapper>
  );
}

export { MyProfile };
