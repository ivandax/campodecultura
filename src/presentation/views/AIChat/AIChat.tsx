import React from 'react';
import { Container } from './AIChat.Styles';
import { ViewTitle } from '@src/presentation/components/ViewTitle';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import { useAuthStore } from '@src/presentation/store/authStore';
import { sendChatMessage, testProtected } from '@src/persistence/ai-chat/ask';
import { Spinner } from '@src/presentation/components/Spinner';
import { TextArea } from '@src/presentation/components/TextArea';
import { notifyError } from '@src/presentation/utils';

const AIChat: React.FC = () => {
  const appUserTask = useAuthStore((state) => state.userTask);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState<string | null>(null);

  const handleTestChat = async (token: string) => {
    const result = await testProtected(token);
    console.log(result.data);
  };

  const handleSend = async (token: string, message: string) => {
    setLoading(true);
    const result = await sendChatMessage(token, message);
    if (result.error) {
      notifyError(result.error.message);
      setLoading(false);
      return;
    }
    setResponse(result.data.choices[0].message.content);
    setLoading(false);
  };

  if (appUserTask.status !== 'successful') {
    return (
      <Container>
        <ViewTitle>
          <Spinner />
        </ViewTitle>
      </Container>
    );
  }

  if (appUserTask.data === null || appUserTask.data.role !== 'DEV') {
    return (
      <Container>
        <ViewTitle>
          Access Denied: You do not have permission to access this view.
        </ViewTitle>
      </Container>
    );
  }

  return (
    <Container>
      <ViewTitle>AI Chat</ViewTitle>
      <MainButton onClick={() => handleTestChat(appUserTask.data!.token)}>
        Test protected endpoint
      </MainButton>
      <TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
        style={{ marginBottom: 16 }}
      />
      <MainButton
        onClick={() => handleSend(appUserTask.data!.token, message)}
        disabled={loading || !message.trim()}
      >
        {loading ? <Spinner /> : 'Send'}
      </MainButton>
      {response && (
        <div style={{ marginTop: 24 }}>
          <strong>Response:</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>
        </div>
      )}
    </Container>
  );
};

export { AIChat };
