import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s+/g, '');
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const formattedPhone = formatPhoneNumber(phone).replace('+', '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function getTelUrl(phone: string): string {
  return `tel:${formatPhoneNumber(phone)}`;
}

export function getMailtoUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  return `mailto:${email}${params.toString() ? `?${params.toString()}` : ''}`;
}

export function getGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateDesignCodes(start: number, end: number): string[] {
  const codes: string[] = [];
  for (let i = start; i <= end; i++) {
    codes.push(`RD ${i.toString().padStart(2, '0')}`);
  }
  return codes;
}
