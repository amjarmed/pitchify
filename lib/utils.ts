import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A shorthand for `twMerge(clsx(...inputs))` which is
 * convenient for merging tailwind classes with other
 * classes.
 *
 * @param inputs - The list of class values to merge.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a human-readable string
 * in the format "Month Day, Year". For example, "July 26, 2022".
 *
 * @param date - A date string in the ISO 8601 format.
 * @returns A formatted string representing the date.
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats the number of views into a human-readable string.
 *
 * @param views - The number of views as a string.
 * @returns A formatted string representing the view count.
 * If the number is 1 or less, "View" is used; otherwise, "Views" is used.
 */
export function formatViews(views: string): string {
  const nb = Number(views);

  if (nb <= 1) {
    return `${nb} View`;
  } else {
    return `${nb} View`;
  }
}

/**
 * Parses a server action response by converting it to a JSON string
 * and then parsing it back to a JavaScript object. This is useful for
 * deep cloning objects or ensuring that the response is a serializable
 * structure.
 *
 * @param response - The server action response to be parsed.
 * @returns A deep cloned version of the input response.
 */

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
