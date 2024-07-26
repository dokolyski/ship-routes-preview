import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { MatCard } from '@angular/material/card';
import { UiLineChartJsComponent } from '@ship-routes-preview/ui-timeline-chart-js';

export interface ShipVelocityPoint {
  timestamp: number;
  knotsSpeed: number;
}

@Component({
  selector: 'ship-routes-ui-ship-velocity-chart',
  standalone: true,
  imports: [BaseChartDirective, MatCard, UiLineChartJsComponent],
  templateUrl: './ui-ship-velocity-chart.component.html',
  styleUrl: './ui-ship-velocity-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiShipVelocityChartComponent {
  readonly routeData = input.required<{ from: string; to: string }>();
  readonly shipVelocityData = input.required<ShipVelocityPoint[]>();
  readonly timelineChartData = computed(() =>
    this.shipVelocityData().map((point) => ({
      timestamp: point.timestamp,
      value: point.knotsSpeed,
    }))
  );
}
