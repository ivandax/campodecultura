import { notifyError, notifySuccess } from "../utils";

export function useCopyUrl() {
  return async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notifySuccess("Post URL copied to clipboard!");
    } catch (err) {
      notifyError("Failed to copy URL");
    }
  };
}
