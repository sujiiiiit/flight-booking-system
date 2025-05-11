import { format } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'dd MMM, yyyy');
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm');
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function getFlightDuration(departure: Date, arrival: Date): number {
  return Math.round((arrival.getTime() - departure.getTime()) / (1000 * 60));
}