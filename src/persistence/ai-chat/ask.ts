import { get } from '.';

export async function sendChatMessage(token: string) {
  return get('http://localhost:8080/chat/ask', token);
}
