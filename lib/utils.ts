import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatViews(views: string): string {
  const nb = Number(views);

  if (nb <= 1) {
    return `${nb} View`;
  } else {
    return `${nb} View`;
  }
}
