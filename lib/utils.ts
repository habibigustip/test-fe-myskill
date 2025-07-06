import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
* Truncate a string and add "..." if it exceeds the max length.
*
* @param {string} str - The input string.
* @param {number} maxLength - Maximum characters to show before truncating.
* @returns {string} - Truncated string with ellipsis if needed.
*/
export function truncateText(str: string, maxLength: number): string {
 if (typeof str !== 'string') return '';
 if (str.length <= maxLength) return str;
 return str.slice(0, maxLength) + '...';
}

/**
 * Format a price value based on locale and currency
 * @param amount number - the price value (e.g., 1999.99)
 * @param currency string - ISO currency code (e.g., 'USD', 'EUR')
 * @param locale string - BCP 47 locale (e.g., 'en-US', 'de-DE')
 */
export function formatPrice(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a Year-Month with format YYYY-MM
 * @param input string - the data value (e.g., 2023-01)
 */
export function formatMonthYear(input: string): string {
  const [yearStr, monthStr] = input.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  if (!year || month < 1 || month > 12) {
    return "-";
  }

  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}