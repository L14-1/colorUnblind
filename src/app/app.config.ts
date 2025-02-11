import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import dbConfig from './db.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIndexedDb(dbConfig),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
