import { format, parseISO } from 'date-fns';

export function formatCurrency(amount: number, currencyCode: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  return formatter.format(amount);
}

export function formatDate(dateString: string, formatString: string): string {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, formatString);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
}