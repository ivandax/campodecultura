import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "@src/presentation/components/Sidebar";
import { RootContainer, MainContent, GlobalStyle } from "./Root.Styles";
import { Home } from "@src/presentation/views/Home";
import { Login } from "@src/presentation/views/Login";
import { SignUp } from "@src/presentation/views/SignUp";
import { CreatePost } from "@src/presentation/views/CreatePost";
import { ViewPost } from "@src/presentation/views/ViewPost";

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <RootContainer>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/view/:postId" element={<ViewPost />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export { Root };
