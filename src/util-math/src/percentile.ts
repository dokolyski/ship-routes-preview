/**
 * Calculates the percentile of an array of numbers.
 * @param {number[]} arr - The array of numbers.
 * @param {number} p - The percentile (between 0 and 100).
 * @returns {number} - The percentile value.
 */
export function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0;
  if (p <= 0) return Math.min(...arr);
  if (p >= 100) return Math.max(...arr);

  arr.sort((a, b) => a - b);
  const index = (p / 100) * (arr.length - 1);
  const lower = Math.floor(index);
  const upper = lower + 1;
  const weight = index - lower;

  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}
