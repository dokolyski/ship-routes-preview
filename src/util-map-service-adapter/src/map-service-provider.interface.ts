import { InjectionToken } from '@angular/core';

export interface MapPoint {
  lat: number;
  lng: number;
}

export interface ColoredMapPoint extends MapPoint {
  color: string;
}

export interface MapServiceAdapter {
  initMap(elementId: string): void;
  showSingleColorRoute(
    route: MapPoint[],
    config: { color: string; zoomOnLocation?: boolean }
  ): number;
  showMultipleColorRoute(
    route: ColoredMapPoint[],
    config?: { zoomOnLocation?: boolean }
  ): number;
  clearRoute(layerId: number): void;
  clearAllRoutes(): void;
  destroyMap(): void;
}

export const MAP_SERVICE_ADAPTER = new InjectionToken<MapServiceAdapter>(
  'MAP_SERVICE_ADAPTER'
);
