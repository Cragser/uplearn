import { formatDistance, addDays, format } from "date-fns";

export function distanceDate(startDate: Date, endDate: Date): string {
  return formatDistance(startDate, endDate);
}

export function fromNow(date: Date): string {
  return formatDistance(date, new Date(), { addSuffix: true });
}

/**
 * @output Example: "(March 7 - March 14)"
 */
export function oneWeekName(): string {
  const today = new Date();
  const oneWeekLater = addDays(today, 7);

  const formattedToday = format(today, "MMMM d");
  const formattedWeekLater = format(oneWeekLater, "MMMM d");

  return `(${formattedToday} - ${formattedWeekLater})`;
}
