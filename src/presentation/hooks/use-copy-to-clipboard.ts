import { notifyError, notifySuccess } from '../utils';

export function useCopyToClipboard() {
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notifySuccess('Text copied to clipboard!');
    } catch (err) {
      notifyError('Failed to copy text');
    }
  };
}
