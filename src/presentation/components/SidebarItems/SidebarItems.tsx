import { SidebarList, SidebarItem } from './SidebarItems.Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '@src/presentation/store/authStore';

interface SidebarItemsProps {
  displayOn: 'desktop' | 'mobile';
  closeSidebar?: () => void;
}

export function SidebarItems({ displayOn, closeSidebar }: SidebarItemsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const userTask = useAuthStore((state) => state.userTask);

  const handleNavigate = (route: string) => {
    navigate(route);
    if (closeSidebar) {
      closeSidebar();
    }
  };

  const getCreateUrl = (userId: string | undefined) =>
    `/posts/${userId}/create`;

  const getMyPostsUrl = (userId: string | undefined) => `/posts/${userId}`;

  const getMyProfileUrl = () => `/my-profile`;

  const showLoginAndSignUp =
    (userTask.status === 'successful' && userTask.data === null) ||
    userTask.status === 'failed';

  return (
    <SidebarList>
      <SidebarItem
        onClick={() => handleNavigate('/home')}
        $active={location.pathname === '/home'}
        $displayOn={displayOn}
      >
        {t('sidebar.home')}
      </SidebarItem>
      {userTask.status === 'successful' && userTask.data !== null && (
        <>
          <SidebarItem
            onClick={() => handleNavigate(getMyPostsUrl(userTask.data?.id))}
            $active={location.pathname === getMyPostsUrl(userTask.data?.id)}
            $displayOn={displayOn}
          >
            {t('sidebar.myPosts')}
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate(getCreateUrl(userTask.data?.id))}
            $active={location.pathname === getCreateUrl(userTask.data?.id)}
            $displayOn={displayOn}
          >
            {t('sidebar.createPost')}
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate(getMyProfileUrl())}
            $active={location.pathname === getMyProfileUrl()}
            $displayOn={displayOn}
          >
            {t('sidebar.myProfile')}
          </SidebarItem>
          {userTask.data.role === 'DEV' && (
            <SidebarItem
              onClick={() => handleNavigate('/all-users')}
              $active={location.pathname === '/all-users'}
              $displayOn={displayOn}
            >
              {t('sidebar.allUsers')}
            </SidebarItem>
          )}
        </>
      )}

      {showLoginAndSignUp && (
        <>
          <SidebarItem
            onClick={() => handleNavigate('/login')}
            $active={location.pathname === '/login'}
            $displayOn={displayOn}
          >
            {t('sidebar.login')}
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate('/signup')}
            $active={location.pathname === '/signup'}
            $displayOn={displayOn}
          >
            {t('sidebar.createAccount')}
          </SidebarItem>
        </>
      )}
    </SidebarList>
  );
}
