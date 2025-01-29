import { formatDistance } from "date-fns";

export function distanceDate(startDate: Date, endDate: Date): string {
  return formatDistance(startDate, endDate);
}

export function fromNow(date: Date): string {
  return formatDistance(date, new Date(), { addSuffix: true });
}
