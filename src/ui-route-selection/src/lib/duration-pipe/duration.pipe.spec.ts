import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const msInDay = 86400000;
  const msInHour = 3600000;
  const msInMinute = 60000;

  it('should create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  describe('for duration longer than 1 day', () => {
    it('should show the duration in "d hh mm" format with the d, h & m suffixes with rounding down to 1 minute', () => {
      const pipe = new DurationPipe();
      expect(pipe.transform(msInDay)).toBe('1d 0h 0m');
      expect(pipe.transform(msInDay + msInMinute - 1)).toBe('1d 0h 0m');
      expect(pipe.transform(msInDay + msInMinute)).toBe('1d 0h 1m');
      expect(
        pipe.transform(42 * msInDay + 20 * msInHour + 22 * msInMinute)
      ).toBe('42d 20h 22m');
    });
  });

  describe('for duration shorter than 1 day', () => {
    it('should show the duration in "hh mm" format with the h & m suffixes with rounding down to 1 minute', () => {
      const pipe = new DurationPipe();
      expect(pipe.transform(msInHour)).toBe('1h 0m');
      expect(pipe.transform(msInHour + msInMinute - 1)).toBe('1h 0m');
      expect(pipe.transform(msInHour + msInMinute)).toBe('1h 1m');
      expect(pipe.transform(14 * msInHour + 59 * msInMinute)).toBe('14h 59m');
    });
  });
});
