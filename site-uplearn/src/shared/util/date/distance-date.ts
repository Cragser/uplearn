import { formatDistance, addDays, format } from "date-fns";

export function distanceDate(startDate: Date, endDate: Date): string {
  return formatDistance(startDate, endDate);
}

export function fromNow(date: Date): string {
  return formatDistance(date, new Date(), { addSuffix: true });
}

/**
 * @output Example: "(7 de marzo - 14 de marzo)"
 */
export function oneWeekName(): string {
  const today = new Date();
  const oneWeekLater = addDays(today, 7);

  const formattedToday = format(today, "d 'de' MMMM");
  const formattedWeekLater = format(oneWeekLater, "d 'de' MMMM");

  return `(${formattedToday} - ${formattedWeekLater})`;
}
