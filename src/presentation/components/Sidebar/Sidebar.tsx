import React from "react";

import { SidebarWrapper, SidebarTitle } from "./Sidebar.Styles";
import { SidebarItems } from "../SidebarItems";

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <SidebarTitle>Working title</SidebarTitle>
      <SidebarItems displayOn="desktop" />
    </SidebarWrapper>
  );
};

export { Sidebar };
