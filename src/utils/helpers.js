import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely — combines clsx + tailwind-merge.
 * Usage: cn('px-4 py-2', isActive && 'bg-primary-500', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with locale-aware separators.
 * formatNumber(1234567) → "1,234,567"
 */
export function formatNumber(n, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(n)
}

/**
 * Truncate a string to a given length and append ellipsis.
 */
export function truncate(str, length = 100) {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

/**
 * Sleep for `ms` milliseconds (useful in async functions / demos).
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
