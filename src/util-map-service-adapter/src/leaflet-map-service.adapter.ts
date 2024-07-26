import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {
  ColoredMapPoint,
  MapPoint,
  MapServiceAdapter,
} from './map-service-provider.interface';

@Injectable()
export class LeafletMapServiceAdapter implements MapServiceAdapter {
  private _layers!: L.LayerGroup;
  private _map!: L.Map;

  initMap(elementId: string): void {
    this._map = L.map(elementId, {
      center: [0, 0],
      zoom: 2,
    });

    this._layers = L.layerGroup();
    this._layers.addTo(this._map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);
  }

  showMultipleColorRoute(
    route: ColoredMapPoint[],
    config?: { zoomOnLocation?: boolean }
  ): number {
    const segments = route.reduce((acc, point, index) => {
      const nextPoint = route[index + 1];
      if (nextPoint) {
        const nextPointInterpolation = {
          lat: (point.lat + nextPoint.lat) / 2,
          lng: (point.lng + nextPoint.lng) / 2,
        };
        acc.push(
          L.polyline(
            [
              [point.lat, point.lng],
              [nextPointInterpolation.lat, nextPointInterpolation.lng],
            ],
            {
              color: point.color,
              className: 'ship-route-polyline',
            }
          )
        );
        acc.push(
          L.polyline(
            [
              [nextPointInterpolation.lat, nextPointInterpolation.lng],
              [nextPoint.lat, nextPoint.lng],
            ],
            {
              color: nextPoint.color,
              className: 'ship-route-polyline',
            }
          )
        );
      }
      return acc;
    }, [] as L.Polyline[]);
    const layer = L.layerGroup(segments);
    this._layers.addLayer(layer);
    if (config?.zoomOnLocation) {
      const auxiliaryPolyline = L.polyline(
        route.map((point) => [point.lat, point.lng]),
        {
          className: 'ship-route-polyline',
        }
      );
      this._zoomOnLocation(auxiliaryPolyline.getBounds());
    }
    return this._layers.getLayerId(layer);
  }

  showSingleColorRoute(
    route: MapPoint[],
    config: { color: string; zoomOnLocation?: boolean }
  ): number {
    const layer = L.polyline(
      route.map((point) => [point.lat, point.lng]),
      {
        color: config.color,
        className: 'ship-route-polyline',
      }
    );
    this._layers.addLayer(layer);
    if (config.zoomOnLocation) {
      this._zoomOnLocation(layer.getBounds());
    }
    return this._layers.getLayerId(layer);
  }

  clearAllRoutes(): void {
    this._layers?.clearLayers();
  }

  clearRoute(layerId: number): void {
    const layerToRemove = this._layers.getLayer(layerId);
    if (layerToRemove) {
      this._layers.removeLayer(layerToRemove);
    }
  }

  destroyMap(): void {
    this._map.remove();
  }

  private _zoomOnLocation(latLngBounds: L.LatLngBounds): void {
    this._map.fitBounds(latLngBounds, {
      padding: [100, 100],
    });
  }
}
