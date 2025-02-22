import { DateTime } from "luxon";

import { toast } from "react-toastify";

export function timestampToHumanReadbleDate(
  timestamp: number,
  locale: "es" | "en"
): string {
  return DateTime.fromMillis(timestamp)
    .setLocale(locale)
    .toLocaleString(DateTime.DATETIME_MED);
}

export const notifySuccess = (message?: string) => {
  toast.success(message ?? "Operation successful!");
};

export const notifyError = (message?: string) => {
  toast.error(message ?? "Something went wrong!");
};
