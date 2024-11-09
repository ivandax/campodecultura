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
      <SidebarTitle>Planets App</SidebarTitle>
      <SidebarItems>
        <SidebarItem
          onClick={() => navigate("/planets")}
          $active={location.pathname === "/planets"}
        >
          Planets
        </SidebarItem>
        <SidebarItem
          onClick={() => navigate("/favorites")}
          $active={location.pathname === "/favorites"}
        >
          Favorites
        </SidebarItem>
      </SidebarItems>
    </SidebarWrapper>
  );
};

export { Sidebar };
