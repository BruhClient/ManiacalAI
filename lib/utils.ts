import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractFileKey(fileUrl: string): string | null {
  const match = fileUrl.match(/\/f\/([^/]+)/);
  return match ? match[1] : null;
}

export function formatFileNameAsTitle(fileName: string): string {
  // Remove file extension and replace special characters with spaces
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, ' ') // Replace dashes and underscores with spaces
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase

  // Convert to title case (capitalize first letter of each word)
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

export function capitalizeFirstLetter(val : string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function bytesToMB(bytes: number): string {
  const mb = 1024 * 1024; // Number of bytes in 1 MB
  return (bytes / mb).toFixed(2);
}