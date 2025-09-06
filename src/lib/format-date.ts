import { format } from 'date-fns';

export function formatDateRFC822(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'EEE, dd MMM yyyy');
}
