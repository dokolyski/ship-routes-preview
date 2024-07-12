import { colorScaledValue } from './color-scaled-value';
import { COLORED_SCALED_VALUE_GRADIENT } from './color.const';

describe('colorScaledValue', () => {
  it('should return the correct color for the minimum value', () => {
    const result = colorScaledValue(0, 100);
    expect(result).toEqual(
      `rgb(${COLORED_SCALED_VALUE_GRADIENT[0].join(',')})`
    );
  });

  it('should return the correct color for the maximum value', () => {
    const result = colorScaledValue(100, 100);
    expect(result).toEqual(
      `rgb(${COLORED_SCALED_VALUE_GRADIENT[
        COLORED_SCALED_VALUE_GRADIENT.length - 1
      ].join(',')})`
    );
  });

  it('should return the max color for values above maximum value', () => {
    const result = colorScaledValue(120, 100);
    expect(result).toEqual(
      `rgb(${COLORED_SCALED_VALUE_GRADIENT[
        COLORED_SCALED_VALUE_GRADIENT.length - 1
      ].join(',')})`
    );
  });

  it('should interpolate colors correctly for a value between two known points', () => {
    // Assuming two first colors are
    // Dark blue: RGB(0, 0, 139) &
    // Cyan: RGB(0, 255, 255)
    // and maxValue = 100
    // when there are 6 steps then cyan should be 100 / 5 = 20
    // then 10 should be an exact mix of the way between dark blue and cyan
    const result = colorScaledValue(10, 100);
    expect(result).toEqual('rgb(0,128,197)'); // Assuming a simple linear interpolation between red (255,0,0) and green (0,255,0)
  });
});
