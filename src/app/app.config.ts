import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { SCROLL_CONFIG } from './constants/scroll-config.constant';
import DB_CONFIG from './db.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
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
        options: {
          darkModeSelector: '.colorunblind-dark',
        },
      },
    }),
  ],
};
