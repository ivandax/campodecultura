import React, { useState } from "react";
import styled from "styled-components";
import { SidebarItems } from "../SidebarItems";
import {
  Backdrop,
  BurgerButton,
  SidebarOverlay,
  TopbarWrapper,
} from "./Topbar.Styles";

const Topbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <TopbarWrapper>
        <BurgerButton onClick={toggleSidebar}>☰</BurgerButton>
        <h4>Campo de cultura</h4>
      </TopbarWrapper>
      <Backdrop isOpen={isSidebarOpen} onClick={closeSidebar} />
      <SidebarOverlay isOpen={isSidebarOpen}>
        <SidebarItems displayOn="mobile" closeSidebar={closeSidebar} />
      </SidebarOverlay>
    </>
  );
};

export { Topbar };
