/** @description Using high percentile as a value for the "max color" eliminates outlier values from the color scale
 * and make the gradient more informative */
export const PERCENTILE_FOR_MAX_COLOR_VALUE = 95 as const;

/** @description The RGB values of the colors used in the gradient from low value to high value. */
export const COLORED_SCALED_VALUE_GRADIENT = [
  [0, 0, 139], // Dark blue: RGB(0, 0, 139)
  [0, 255, 255], // Cyan: RGB(0, 255, 255)
  [0, 128, 0], // Green: RGB(0, 128, 0)
  [255, 255, 0], // Yellow: RGB(255, 255, 0)
  [255, 165, 0], // Orange: RGB(255, 165, 0)
  [255, 0, 0], // Red: RGB(255, 0, 0)
] as const;
