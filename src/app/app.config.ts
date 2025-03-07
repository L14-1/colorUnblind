import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import DB_CONFIG from './db.config';
import { SCROLL_CONFIG } from './constants/scroll-config.constant';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling(SCROLL_CONFIG),
    ),
    provideIndexedDb(DB_CONFIG),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
