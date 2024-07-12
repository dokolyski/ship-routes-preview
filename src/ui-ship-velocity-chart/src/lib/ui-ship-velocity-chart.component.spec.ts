import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { UiShipVelocityChartComponent } from './ui-ship-velocity-chart.component';
import { UiLineChartJsComponent } from '@marcura-test/ui-timeline-chart-js';
import { MockComponents } from 'ng-mocks';

describe('UiShipVelocityChartComponent', () => {
  let spectator: Spectator<UiShipVelocityChartComponent>;
  const createComponent = createComponentFactory({
    component: UiShipVelocityChartComponent,
    imports: [MockComponents(UiLineChartJsComponent)],
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          routeData: { from: 'ABC', to: 'DEF' },
          shipVelocityData: [
            { timestamp: 1, knotsSpeed: 10 },
            { timestamp: 2, knotsSpeed: 20 },
          ],
        },
      }))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
