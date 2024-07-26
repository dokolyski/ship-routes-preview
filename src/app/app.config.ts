import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  LeafletMapServiceAdapter,
  MAP_SERVICE_ADAPTER,
} from '@ship-routes-preview/util-map-service-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    {
      provide: MAP_SERVICE_ADAPTER,
      useClass: LeafletMapServiceAdapter,
    },
    provideAnimationsAsync(),
  ],
};
