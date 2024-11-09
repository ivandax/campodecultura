import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  SidebarWrapper,
  SidebarTitle,
  SidebarItems,
  SidebarItem,
} from "./Sidebar.Styles";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarWrapper>
      <SidebarTitle>Campo de cultura</SidebarTitle>
      <SidebarItems>
        <SidebarItem
          onClick={() => navigate("/home")}
          $active={location.pathname === "/planets"}
        >
          Inicio
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
