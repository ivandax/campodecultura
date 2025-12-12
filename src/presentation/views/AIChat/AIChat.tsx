import React from 'react';
import { Container } from './AIChat.Styles';
import { ViewTitle } from '@src/presentation/components/ViewTitle';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import { useAuthStore } from '@src/presentation/store/authStore';
import { sendChatMessage } from '@src/persistence/ai-chat/ask';

const AIChat: React.FC = () => {
  const appUserTask = useAuthStore((state) => state.userTask);

  const handleTestChat = async (token: string) => {
    const data = await sendChatMessage(token);
    return data;
  };

  if (appUserTask.status !== 'successful') {
    return (
      <Container>
        <ViewTitle>Loading...</ViewTitle>
      </Container>
    );
  }

  return (
    <Container>
      <ViewTitle>AI Chat</ViewTitle>
      <MainButton onClick={() => handleTestChat(appUserTask.data!.token)}>
        Test Chat
      </MainButton>
    </Container>
  );
};

export { AIChat };
