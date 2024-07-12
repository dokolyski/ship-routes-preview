import { createComponentFactory } from '@ngneat/spectator/jest';
import { UiRouteSelectionComponent } from './ui-route-selection.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('UiRouteSelectionComponent', () => {
  const createComponent = createComponentFactory({
    component: UiRouteSelectionComponent,
  });

  it('should create', () => {
    // Arrange & Act
    const spectator = createComponent({ props: { allRoutes: [] } });
    // Assert
    expect(spectator.component).toBeTruthy();
  });

  it('should display the route options', async () => {
    // Arrange & Act
    const spectator = createComponent({
      props: {
        allRoutes: [
          {
            from: 'Port 1',
            to: 'Port 2',
            id: '1',
            durationInMs: 1000,
            routeStartDate: 0,
          },
          {
            from: 'Port 2',
            to: 'Port 3',
            id: '2',
            durationInMs: 2000,
            routeStartDate: 0,
          },
        ],
      },
    });
    const loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    const select = await loader.getHarness(MatSelectHarness);

    // Act
    await select.open();

    // Assert
    const options = await select.getOptions();
    const optionTexts = await Promise.all(
      options.map((option) => option.getText())
    );
    expect(optionTexts).toEqual([
      expect.stringContaining('Port 1 -> Port 2'),
      expect.stringContaining('Port 2 -> Port 3'),
    ]);
  });

  it('should emit the selected route id when a route is selected', async () => {
    // Arrange
    const spectator = createComponent({
      props: {
        allRoutes: [
          {
            from: 'Port 1',
            to: 'Port 2',
            id: '1',
            durationInMs: 1000,
            routeStartDate: 0,
          },
          {
            from: 'Port 2',
            to: 'Port 3',
            id: '2',
            durationInMs: 2000,
            routeStartDate: 0,
          },
        ],
      },
    });
    const loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    const select = await loader.getHarness(MatSelectHarness);
    const spy = jest.spyOn(spectator.component.routeSelected, 'emit');

    // Act
    await select.open();
    await select.clickOptions({ text: /^Port 2 -> Port 3/ });

    // Assert
    expect(spy).toHaveBeenCalledWith('2');
  });

  it('should emit the highlighted route id when a route is highlighted', async () => {
    // Arrange
    const spectator = createComponent({
      props: {
        allRoutes: [
          {
            from: 'Port 1',
            to: 'Port 2',
            id: '1',
            durationInMs: 1000,
            routeStartDate: 0,
          },
          {
            from: 'Port 2',
            to: 'Port 3',
            id: '2',
            durationInMs: 2000,
            routeStartDate: 0,
          },
        ],
      },
    });
    const loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    const select = await loader.getHarness(MatSelectHarness);
    const spy = jest.spyOn(spectator.component.routeHighlighted, 'emit');

    // Act
    await select.open();
    const option = await (
      await select.getOptions({ text: /^Port 2 -> Port 3/ })
    )[0].host();
    option.dispatchEvent('mouseover');

    // Assert
    expect(spy).toHaveBeenCalledWith('2');
  });
});
