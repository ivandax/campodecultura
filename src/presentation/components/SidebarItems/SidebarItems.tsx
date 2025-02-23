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

  return (
    <SidebarList>
      <SidebarItem
        onClick={() => handleNavigate("/home")}
        $active={location.pathname === "/home"}
        $displayOn={displayOn}
      >
        Home
      </SidebarItem>
      <SidebarItem
        onClick={() => handleNavigate("/news")}
        $active={location.pathname === "/news"}
        $displayOn={displayOn}
      >
        News
      </SidebarItem>
      {userTask.status === "successful" &&
        userTask.data !== null &&
        userTask.data.role === "ADMIN" && (
          <>
            <SidebarItem
              onClick={() => handleNavigate("/create")}
              $active={location.pathname === "/create"}
              $displayOn={displayOn}
            >
              Create post
            </SidebarItem>
          </>
        )}

      {userTask.status === "successful" && userTask.data === null && (
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

      {/* <SidebarItem
        onClick={() => handleNavigate("/sponsors")}
        $active={location.pathname === "/sponsors"}
        $displayOn={displayOn}
      >
        Sponsors
      </SidebarItem> */}
    </SidebarList>
  );
}
