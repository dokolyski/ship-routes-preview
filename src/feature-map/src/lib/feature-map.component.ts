import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ShipRoute,
  ShipRoutesApiService,
} from '@marcura-test/data-access-ship-routes';
import { UiMapComponent } from '@marcura-test/ui-map';
import { shareReplay, tap } from 'rxjs';

@Component({
  selector: 'feature-map',
  standalone: true,
  templateUrl: './feature-map.component.html',
  styleUrl: './feature-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiMapComponent, AsyncPipe],
})
export class FeatureMapComponent {
  readonly allShipRoutes = toSignal(
    inject(ShipRoutesApiService)
      .getShipRoutesFromCSV()
      .pipe(
        shareReplay(1),
        tap((a) => this.selectedShipRoute.set(a[1]))
      )
  );

  readonly selectedShipRoute = signal(null as null | ShipRoute);
}
