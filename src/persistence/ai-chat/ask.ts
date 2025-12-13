import { Result } from '@src/domain/Result';
import { get, post } from '.';

export async function testProtected(token: string) {
  return get('http://localhost:8080/chat/test-protected', token);
}

interface ChatMessageResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function sendChatMessage(
  token: string,
  message: string
): Promise<Result<ChatMessageResponse>> {
  return post('http://localhost:8080/chat/ask', { message }, token) as Promise<
    Result<ChatMessageResponse>
  >;
}
