import { SidebarList, SidebarItem } from "./SidebarItems.Styles";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@src/presentation/store/authStore";

interface SidebarItemsProps {
  displayOn: "desktop" | "mobile";
  closeSidebar?: () => void;
}

export function SidebarItems({ displayOn, closeSidebar }: SidebarItemsProps) {
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
    (userTask.status === "successful" && userTask.data === null) ||
    userTask.status === "failed";

  return (
    <SidebarList>
      <SidebarItem
        onClick={() => handleNavigate("/home")}
        $active={location.pathname === "/home"}
        $displayOn={displayOn}
      >
        Home
      </SidebarItem>
      {userTask.status === "successful" && userTask.data !== null && (
        <>
          <SidebarItem
            onClick={() => handleNavigate(getMyPostsUrl(userTask.data?.id))}
            $active={location.pathname === getMyPostsUrl(userTask.data?.id)}
            $displayOn={displayOn}
          >
            My posts
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate(getCreateUrl(userTask.data?.id))}
            $active={location.pathname === getCreateUrl(userTask.data?.id)}
            $displayOn={displayOn}
          >
            Create post
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate(getMyProfileUrl())}
            $active={location.pathname === getMyProfileUrl()}
            $displayOn={displayOn}
          >
            My profile
          </SidebarItem>
        </>
      )}

      {showLoginAndSignUp && (
        <>
          <SidebarItem
            onClick={() => handleNavigate("/login")}
            $active={location.pathname === "/login"}
            $displayOn={displayOn}
          >
            Log in
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate("/signup")}
            $active={location.pathname === "/signup"}
            $displayOn={displayOn}
          >
            Create account
          </SidebarItem>
        </>
      )}
    </SidebarList>
  );
}
