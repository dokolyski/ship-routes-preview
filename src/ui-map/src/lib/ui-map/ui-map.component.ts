import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ShipRoute } from '@ship-routes-preview/data-access-ship-routes';
import { MAP_SERVICE_ADAPTER } from '@ship-routes-preview/util-map-service-adapter';
import { percentile } from '@ship-routes-preview/util-math';
import {
  colorScaledValue,
  PERCENTILE_FOR_MAX_COLOR_VALUE,
} from '@ship-routes-preview/util-color';

@Component({
  selector: 'ship-routes-ui-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-map.component.html',
  styleUrl: './ui-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMapComponent implements OnInit {
  private readonly _mapServiceProvider = inject(MAP_SERVICE_ADAPTER);
  private _highlightedRouteId?: number;

  @Input() set selectedRoute(selectedRoute: ShipRoute | null) {
    if (selectedRoute) {
      this._showSelectedRoute(selectedRoute);
    } else {
      this._mapServiceProvider.clearAllRoutes();
    }
  }

  @Input() set highlightedRoute(highlightedRoute: ShipRoute | null) {
    if (highlightedRoute) {
      this._showHighlightedRoute(highlightedRoute);
    } else if (this._highlightedRouteId) {
      this._mapServiceProvider.clearRoute(this._highlightedRouteId);
    }
  }

  ngOnInit(): void {
    this._mapServiceProvider.initMap('map');
  }

  private _showSelectedRoute(shipRoute: ShipRoute): void {
    this._mapServiceProvider.clearAllRoutes();

    // high percentile is used to cut off the outliers and differentiate the colors
    const speedForTheMaxColor = percentile(
      shipRoute.points.map((point) => point.knotsSpeed),
      PERCENTILE_FOR_MAX_COLOR_VALUE
    );
    this._mapServiceProvider.showMultipleColorRoute(
      shipRoute.points.map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
        color: colorScaledValue(point.knotsSpeed, speedForTheMaxColor),
      })),
      { zoomOnLocation: true }
    );
  }

  private _showHighlightedRoute(shipRoute: ShipRoute): void {
    this._highlightedRouteId = this._mapServiceProvider.showSingleColorRoute(
      shipRoute.points.map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
      })),
      { color: 'black' }
    );
  }
}
