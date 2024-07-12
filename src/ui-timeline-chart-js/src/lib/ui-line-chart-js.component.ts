import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import { percentile } from '@marcura-test/util-math';
import {
  colorScaledValue,
  PERCENTILE_FOR_MAX_COLOR_VALUE,
} from '@marcura-test/util-color';
import 'chartjs-adapter-date-fns';

export interface TimelineChartData {
  points: {
    timestamp: number;
    value: number;
  }[];
  label: string;
  yLabel: string;
}

@Component({
  selector: 'lib-ui-line-chart-js',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './ui-line-chart-js.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLineChartJsComponent {
  readonly timelineChartData = input.required<TimelineChartData>();
  readonly lineChartData = computed<
    ChartDataset<'line', { x: number; y: number }[]>[]
  >(() => {
    const valueForTheMaxColor = percentile(
      this.timelineChartData().points.map((point) => point.value),
      PERCENTILE_FOR_MAX_COLOR_VALUE
    );
    const colors = this.timelineChartData().points.map((point) =>
      colorScaledValue(point.value, valueForTheMaxColor)
    );
    return [
      {
        data: this.timelineChartData().points.map((point) => ({
          y: point.value,
          x: point.timestamp,
        })),
        fill: true,
        pointStyle: 'circle',
        pointBackgroundColor: colors,
        label: this.timelineChartData().label,
        borderColor: colors,
      },
    ];
  });
  lineChartOptions = computed<ChartOptions>(() => ({
    responsive: false,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            hour: 'MMM d HH:mm',
          },
          unit: 'hour',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: this.timelineChartData().yLabel,
        },
      },
    },
  }));
}
