import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { UiLineChartJsComponent } from './ui-line-chart-js.component';
import { MockDirective } from 'ng-mocks';
import { BaseChartDirective } from 'ng2-charts';

describe('UiLineChartJsComponent', () => {
  let spectator: Spectator<UiLineChartJsComponent>;
  const createComponent = createComponentFactory({
    component: UiLineChartJsComponent,
    declarations: [MockDirective(BaseChartDirective)],
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          timelineChartData: { yLabel: 'yLabel', label: 'label', points: [] },
        },
      }))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
