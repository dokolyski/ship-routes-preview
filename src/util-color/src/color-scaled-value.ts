import { COLORED_SCALED_VALUE_GRADIENT } from './color.const';

export function colorScaledValue(value: number, maxValue: number): string {
  // Normalize velocity within the range of minVelocity to maxVelocity
  const ratio = Math.min(value / maxValue, 1);
  const scaledRatio = ratio * (COLORED_SCALED_VALUE_GRADIENT.length - 1);
  const lowerIndex = Math.floor(scaledRatio);
  const upperIndex = Math.ceil(scaledRatio);
  const weight = scaledRatio - lowerIndex;

  const lowerColor = COLORED_SCALED_VALUE_GRADIENT[lowerIndex];
  const upperColor = COLORED_SCALED_VALUE_GRADIENT[upperIndex];

  const r = Math.round(
    lowerColor[0] + weight * (upperColor[0] - lowerColor[0])
  );
  const g = Math.round(
    lowerColor[1] + weight * (upperColor[1] - lowerColor[1])
  );
  const b = Math.round(
    lowerColor[2] + weight * (upperColor[2] - lowerColor[2])
  );

  return `rgb(${r},${g},${b})`;
}
