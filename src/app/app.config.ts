import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  LeafletMapServiceProviderService,
  MAP_SERVICE_PROVIDER,
} from '@ship-routes-preview/util-map-service-provider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    {
      provide: MAP_SERVICE_PROVIDER,
      useClass: LeafletMapServiceProviderService,
    },
    provideAnimationsAsync(),
  ],
};
