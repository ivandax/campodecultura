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

  const appUser = useAuthStore((state) => state.user);

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
        Inicio
      </SidebarItem>
      {appUser && appUser.role === "ADMIN" && (
        <>
          <SidebarItem
            onClick={() => handleNavigate("/create")}
            $active={location.pathname === "/create"}
            $displayOn={displayOn}
          >
            Crear post
          </SidebarItem>
        </>
      )}

      {appUser === null && (
        <>
          <SidebarItem
            onClick={() => handleNavigate("/login")}
            $active={location.pathname === "/login"}
            $displayOn={displayOn}
          >
            Iniciar sesión
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate("/signup")}
            $active={location.pathname === "/signup"}
            $displayOn={displayOn}
          >
            Crear cuenta
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
