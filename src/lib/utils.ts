/**
 * Format a date string into a readable format
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g. "May 1, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate a string to a specified length
 * @param str String to truncate
 * @param length Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}

/**
 * Generate a random ID
 * @returns Random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Group an array of items by a specific property
 * @param array Array to group
 * @param key Property to group by
 * @returns Object with groups
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    result[groupKey] = result[groupKey] || []
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}
