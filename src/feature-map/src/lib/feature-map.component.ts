import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ShipRoute,
  ShipRoutesApiService,
} from '@ship-routes-preview/data-access-ship-routes';
import { UiMapComponent } from '@ship-routes-preview/ui-map';
import { UiRouteSelectionComponent } from '@ship-routes-preview/ui-route-selection';
import { shareReplay } from 'rxjs';
import {
  ShipVelocityPoint,
  UiShipVelocityChartComponent,
} from '@ship-routes-preview/ui-ship-velocity-chart';

@Component({
  selector: 'ship-routes-feature-map',
  standalone: true,
  templateUrl: './feature-map.component.html',
  styleUrl: './feature-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiMapComponent,
    UiRouteSelectionComponent,
    JsonPipe,
    UiShipVelocityChartComponent,
  ],
})
export class FeatureMapComponent {
  readonly allShipRoutes = toSignal(
    inject(ShipRoutesApiService).getShipRoutesFromCSV().pipe(shareReplay(1)),
    { initialValue: [] }
  );
  readonly allShipRoutesSelectOption = computed(() =>
    this.allShipRoutes().map((route) => ({
      from: route.fromPort,
      to: route.toPort,
      id: route.routeId,
      durationInMs: +route.durationInMs,
      routeStartDate: +route.points[0].timestamp,
    }))
  );

  readonly selectedShipRoute = signal(null as null | ShipRoute);
  readonly highlightedShipRoute = signal(null as null | ShipRoute);
  readonly shipRouteData = computed(() =>
    this.selectedShipRoute()?.points.map((point) => ({
      knotsSpeed: point.knotsSpeed,
      timestamp: point.timestamp,
    }))
  );

  routeSelected(routeId: string | null) {
    this.selectedShipRoute.set(
      this.allShipRoutes().find((route) => route.routeId === routeId) || null
    );
  }

  highlightRoute(routeId: string | null) {
    this.highlightedShipRoute.set(
      this.allShipRoutes().find((route) => route.routeId === routeId) || null
    );
  }
}
