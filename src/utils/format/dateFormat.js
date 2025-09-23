import { format, parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export const dateFormat = (date, form = "MMM, dd, yyyy", timeZone = "Asia/Manila") => {
  if (!date || date === null) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    return "-";
  }

  // Convert the date to the specified time zone (default: UTC)
  const zonedDate = toZonedTime(parsedDate, timeZone);

  // Format the date in the desired time zone
  return format(zonedDate, form);
};

export const toUTC = (date, timeZone = "Asia/Manila") => {
  if (!date) return null;

  const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);
  if (isNaN(parsedDate.getTime())) return null;

  return fromZonedTime(parsedDate, timeZone);
};
