import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FeatureMapComponent } from './feature-map.component';
import { MockComponent } from 'ng-mocks';
import { UiMapComponent } from '@marcura-test/ui-map';
import { UiShipVelocityChartComponent } from '@marcura-test/ui-ship-velocity-chart';
import { mockProvider } from '@ngneat/spectator/jest';
import {
  ShipRoute,
  ShipRoutesApiService,
} from '@marcura-test/data-access-ship-routes';
import { of } from 'rxjs';

const ALL_SHIP_ROUTES_MOCK: ShipRoute[] = [
  {
    routeId: '1',
    fromPort: 'A',
    toPort: 'B',
    durationInMs: '1000',
    points: [
      { timestamp: 1, knotsSpeed: 10, latitude: 1, longitude: 1 },
      { timestamp: 2, knotsSpeed: 20, latitude: 1, longitude: 1 },
    ],
  },
  {
    routeId: '2',
    fromPort: 'B',
    toPort: 'C',
    durationInMs: '2000',
    points: [
      { timestamp: 1, knotsSpeed: 10, latitude: 1, longitude: 1 },
      { timestamp: 2, knotsSpeed: 20, latitude: 1, longitude: 1 },
    ],
  },
];

describe('FeatureMapComponent', () => {
  let spectator: Spectator<FeatureMapComponent>;
  const createComponent = createComponentFactory({
    component: FeatureMapComponent,
    providers: [
      mockProvider(ShipRoutesApiService, {
        getShipRoutesFromCSV: () => of(ALL_SHIP_ROUTES_MOCK),
      }),
    ],
    imports: [
      MockComponent(UiMapComponent),
      MockComponent(UiShipVelocityChartComponent),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should pass selected route to UiMapComponent', () => {
    spectator.component.routeSelected('1');
    spectator.detectChanges();
    expect(spectator.query(UiMapComponent)?.selectedRoute).toEqual(
      ALL_SHIP_ROUTES_MOCK[0]
    );
  });

  it('should pass highlighted route to UiMapComponent', () => {
    spectator.component.highlightRoute('2');
    spectator.detectChanges();
    expect(spectator.query(UiMapComponent)?.highlightedRoute).toEqual(
      ALL_SHIP_ROUTES_MOCK[1]
    );
  });
});
