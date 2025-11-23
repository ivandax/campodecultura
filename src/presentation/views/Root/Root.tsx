import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Sidebar } from '@src/presentation/components/Sidebar';
import { Topbar } from '@src/presentation/components/Topbar';
import { RootContainer, MainContent, GlobalStyle } from './Root.Styles';
import { MyPosts } from '@src/presentation/views/MyPosts';
import { Login } from '@src/presentation/views/Login';
import { SignUp } from '@src/presentation/views/SignUp';
import { CreateEditPost } from '@src/presentation/views/CreateEditPost';
import { ViewPost } from '@src/presentation/views/ViewPost';
import { MyProfile } from '@src/presentation/views/MyProfile';
import { LandingPage } from '@src/presentation/views/LandingPage';
import { AllUsers } from '@src/presentation/views/AllUsers/AllUsers';
import { AnalyticsTracker } from '@src/presentation/components/AnalyticsTracker';
import { RecoverPassword } from '@src/presentation/views/RecoverPassword';
import { VerifyEmail } from '@src/presentation/views/VerifyEmail';
import { SetNewPassword } from '@src/presentation/views/SetNewPassword';
import { Analytics } from 'firebase/analytics';

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
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/posts/:userId/create" element={<CreateEditPost />} />
            <Route
              path="/posts/:userId/edit/:postId"
              element={<CreateEditPost />}
            />
            <Route path="/posts/:userId/view/:postId" element={<ViewPost />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export { Root };
