import { createComponentFactory } from '@ngneat/spectator/jest';
import { UiMapComponent } from './ui-map.component';
import {
  LeafletMapServiceAdapter,
  MAP_SERVICE_ADAPTER,
} from '@ship-routes-preview/util-map-service-adapter';
import { ShipRoute } from '@ship-routes-preview/data-access-ship-routes';

const selectors = {
  map: '#map',
  shipRoutePolyline: '.ship-route-polyline',
};

const SHIP_ROUTE_MOCK: ShipRoute = {
  points: [
    { latitude: 0, longitude: 0, knotsSpeed: 10, timestamp: 0 },
    { latitude: 1, longitude: 1, knotsSpeed: 20, timestamp: 1 },
  ],
  fromPort: 'fromPort',
  toPort: 'toPort',
  durationInMs: '1000',
  routeId: '1234',
} as const;

describe('UiMapComponent', () => {
  const createComponent = createComponentFactory({
    component: UiMapComponent,
    imports: [UiMapComponent],
    providers: [
      {
        provide: MAP_SERVICE_ADAPTER,
        useClass: LeafletMapServiceAdapter,
      },
    ],
  });

  it('Map should be initialized and visible', () => {
    // Arrange
    createComponent();

    // Assert
    expect(selectors.map).toBeVisible();
  });

  xdescribe('todo: leaflet doesnt work in test https://stackoverflow.com/questions/78216479/cannot-use-in-operator-to-search-for-leaflet-id-in-null-in-testing', () => {
    describe('when selected ship route is not provided', () => {
      it('should not show ship route', () => {
        // Arrange
        const spectator = createComponent();

        // Act
        spectator.setInput('selectedRoute', null);

        // Assert
        expect(selectors.shipRoutePolyline).not.toBeVisible();
      });
    });

    describe('when selected ship route is provided', () => {
      it('should show ship route', () => {
        // Arrange
        const spectator = createComponent();

        // Act
        spectator.setInput('selectedRoute', SHIP_ROUTE_MOCK);

        // Assert
        expect(spectator.query('.ship-route-polyline')).toBeVisible();
      });

      describe('when provided selected ship route is removed', () => {
        it('should not show ship route', () => {
          // Arrange
          const spectator = createComponent();

          // Act
          spectator.setInput('selectedRoute', SHIP_ROUTE_MOCK);
          spectator.setInput('selectedRoute', null);

          // Assert
          expect(spectator.query('.ship-route-polyline')).not.toBeVisible();
        });
      });

      describe('when selected ship route is changed', () => {
        it('should show only one route', () => {
          // Arrange
          const spectator = createComponent();

          // Act
          spectator.setInput('selectedRoute', SHIP_ROUTE_MOCK);
          spectator.setInput('selectedRoute', {
            ...SHIP_ROUTE_MOCK,
            routeId: '4321',
          });

          // Assert
          expect(spectator.queryAll('.ship-route-polyline')).toHaveLength(1);
          expect(spectator.query('.ship-route-polyline')).toBeVisible();
        });
      });
    });

    describe('when highlighted ship route is not provided', () => {
      it('should not show highlighted ship route', () => {
        // Arrange
        const spectator = createComponent();

        // Act
        spectator.setInput('highlightedRoute', null);

        // Assert
        expect(selectors.shipRoutePolyline).not.toBeVisible();
      });
    });

    describe('when highlighted ship route is provided', () => {
      it('should show highlighted ship route', () => {
        // Arrange
        const spectator = createComponent();

        // Act
        spectator.setInput('highlightedRoute', SHIP_ROUTE_MOCK);

        // Assert
        expect(spectator.query('.ship-route-polyline')).toBeVisible();
      });

      describe('when provided highlighted ship route is removed', () => {
        it('should not show highlighted ship route', () => {
          // Arrange
          const spectator = createComponent();

          // Act
          spectator.setInput('highlightedRoute', SHIP_ROUTE_MOCK);
          spectator.setInput('highlightedRoute', null);

          // Assert
          expect(spectator.query('.ship-route-polyline')).not.toBeVisible();
        });
      });

      describe('when highlighted ship route is changed', () => {
        it('should show only one route', () => {
          // Arrange
          const spectator = createComponent();

          // Act
          spectator.setInput('highlightedRoute', SHIP_ROUTE_MOCK);
          spectator.setInput('highlightedRoute', {
            ...SHIP_ROUTE_MOCK,
            routeId: '4321',
          });

          // Assert
          expect(spectator.queryAll('.ship-route-polyline')).toHaveLength(1);
          expect(spectator.query('.ship-route-polyline')).toBeVisible();
        });
      });
    });
  });
});
