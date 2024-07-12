import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(milliseconds: number): string {
    const minutes = milliseconds / 60000;
    const days = Math.floor(minutes / 1440);
    const remainingHours = Math.floor(minutes / 60) % 24;
    const remainingMinutes = Math.floor(minutes) % 60;
    return days
      ? `${days}d ${remainingHours}h ${remainingMinutes}m`
      : `${remainingHours}h ${remainingMinutes}m`;
  }
}
