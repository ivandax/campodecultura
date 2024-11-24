import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "@src/presentation/components/Sidebar";
import { Topbar } from "@src/presentation/components/Topbar";
import { RootContainer, MainContent, GlobalStyle } from "./Root.Styles";
import { Home } from "@src/presentation/views/Home";
import { Login } from "@src/presentation/views/Login";
import { SignUp } from "@src/presentation/views/SignUp";
import { CreateEditPost } from "@src/presentation/views/CreateEditPost";
import { ViewPost } from "@src/presentation/views/ViewPost";

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <RootContainer>
        <Topbar />
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<CreateEditPost />} />
            <Route path="/edit/:postId" element={<CreateEditPost />} />
            <Route path="/view/:postId" element={<ViewPost />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export { Root };
