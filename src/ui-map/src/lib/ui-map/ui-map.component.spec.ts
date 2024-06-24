import { createComponentFactory } from '@ngneat/spectator/jest';
import { UiMapComponent } from './ui-map.component';

const selectors = {
  map: '#map',
  shipRoutePolyline: '.ship-route-polyline',
};

describe('UiMapComponent', () => {
  const createComponent = createComponentFactory({
    component: UiMapComponent,
    imports: [],
  });

  it('Map should be initialized and visible', () => {
    // Arrange
    createComponent();

    // Assert
    expect(selectors.map).toBeVisible();
  });

  describe('when ship route is not provided', () => {
    it('should not show ship route', () => {
      // Arrange
      const spectator = createComponent();

      // Act
      spectator.setInput('shipRoute', null);

      // Assert
      expect(selectors.shipRoutePolyline).not.toBeVisible();
    });
  });

  describe('when ship route is provided', () => {
    it('should show ship route', () => {
      // Arrange
      const spectator = createComponent();
      const shipRoute = {
        points: [
          { latitude: 0, longitude: 0 },
          { latitude: 1, longitude: 1 },
        ],
      };

      // Act
      spectator.setInput('shipRoute', shipRoute);

      // Assert
      expect(spectator.query('.ship-route-polyline')).toBeVisible();
    });

    describe('when provided ship route is removed', () => {
      it('should not show ship route', () => {
        // Arrange
        const spectator = createComponent();
        const shipRoute = {
          points: [
            { latitude: 0, longitude: 0 },
            { latitude: 1, longitude: 1 },
          ],
        };

        // Act
        spectator.setInput('shipRoute', shipRoute);
        spectator.setInput('shipRoute', null);

        // Assert
        expect(spectator.query('.ship-route-polyline')).not.toBeVisible();
      });
    });

    describe('when ship route is changed', () => {
      it('should show only one route', () => {
        // Arrange
        const spectator = createComponent();
        const firstShipRoute = {
          points: [
            { latitude: 0, longitude: 0 },
            { latitude: 1, longitude: 1 },
          ],
        };
        const secondShipRoute = {
          points: [
            { latitude: 1, longitude: 1 },
            { latitude: 2, longitude: 2 },
          ],
        };

        // Act
        spectator.setInput('shipRoute', firstShipRoute);
        spectator.setInput('shipRoute', secondShipRoute);

        // Assert
        expect(spectator.queryAll('.ship-route-polyline')).toHaveLength(1);
        expect(spectator.query('.ship-route-polyline')).toBeVisible();
      });
    });
  });

  describe('when ship route is changed', () => {
    it('should show new ship route', () => {
      // Arrange
      const spectator = createComponent();
      const firstShipRoute = {
        points: [
          { latitude: 0, longitude: 0 },
          { latitude: 1, longitude: 1 },
        ],
      };
      const secondShipRoute = {
        points: [
          { latitude: 1, longitude: 1 },
          { latitude: 2, longitude: 2 },
        ],
      };

      // Act
      spectator.setInput('shipRoute', firstShipRoute);
      spectator.setInput('shipRoute', secondShipRoute);

      // Assert
      expect(spectator.query('.ship-route-polyline')).toBeVisible();
    });
  });
});
