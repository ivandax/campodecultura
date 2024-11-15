import React from "react";

import { SidebarWrapper, SidebarTitle } from "./Sidebar.Styles";
import { SidebarItems } from "../SidebarItems";

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <SidebarTitle>Campo de cultura</SidebarTitle>
      <SidebarItems displayOn="desktop" />
    </SidebarWrapper>
  );
};

export { Sidebar };
