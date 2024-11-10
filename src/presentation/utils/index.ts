import { DateTime } from "luxon";

export function timestampToHumanReadbleDate(
  timestamp: number,
  locale: "es" | "en"
): string {
  return DateTime.fromMillis(timestamp)
    .setLocale(locale)
    .toLocaleString(DateTime.DATETIME_MED);
}
