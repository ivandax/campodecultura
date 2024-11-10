import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  SidebarWrapper,
  SidebarTitle,
  SidebarItems,
  SidebarItem,
} from "./Sidebar.Styles";
import { useAuthStore } from "@src/presentation/store/authStore";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const appUser = useAuthStore((state) => state.user);

  return (
    <SidebarWrapper>
      <SidebarTitle>Campo de cultura</SidebarTitle>
      <SidebarItems>
        <SidebarItem
          onClick={() => navigate("/home")}
          $active={location.pathname === "/home"}
        >
          Inicio
        </SidebarItem>
        {appUser && (
          <SidebarItem
            onClick={() => navigate("/create")}
            $active={location.pathname === "/create"}
          >
            Crear post
          </SidebarItem>
        )}
        <SidebarItem
          onClick={() => navigate("/login")}
          $active={location.pathname === "/login"}
        >
          Iniciar sesión
        </SidebarItem>
        <SidebarItem
          onClick={() => navigate("/signup")}
          $active={location.pathname === "/signup"}
        >
          Crear cuenta
        </SidebarItem>
        <SidebarItem
          onClick={() => navigate("/sponsors")}
          $active={location.pathname === "/sponsors"}
        >
          Sponsors
        </SidebarItem>
      </SidebarItems>
    </SidebarWrapper>
  );
};

export { Sidebar };
