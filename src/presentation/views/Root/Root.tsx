import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "@src/presentation/components/Sidebar";
import { Topbar } from "@src/presentation/components/Topbar";
import { RootContainer, MainContent, GlobalStyle } from "./Root.Styles";
import { MyPosts } from "@src/presentation/views/MyPosts";
import { Login } from "@src/presentation/views/Login";
import { SignUp } from "@src/presentation/views/SignUp";
import { CreateEditPost } from "@src/presentation/views/CreateEditPost";
import { ViewPost } from "@src/presentation/views/ViewPost";
import { LandingPage } from "@src/presentation/views/LandingPage";
import { AnalyticsTracker } from "@src/presentation/components/AnalyticsTracker";
import { Analytics } from "firebase/analytics";

interface RootProps {
  analytics: Analytics;
}

const Root: React.FC<RootProps> = ({ analytics }: RootProps) => {
  return (
    <BrowserRouter>
      <AnalyticsTracker analytics={analytics} />
      <GlobalStyle />
      <RootContainer>
        <Topbar />
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/home" element={<LandingPage />} />
            <Route path="/posts/:userId" element={<MyPosts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/posts/:userId/create" element={<CreateEditPost />} />
            <Route
              path="/posts/:userId/edit/:postId"
              element={<CreateEditPost />}
            />
            <Route path="/posts/:userId/view/:postId" element={<ViewPost />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export { Root };
