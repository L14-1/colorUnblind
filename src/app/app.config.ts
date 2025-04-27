import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { SCROLL_CONFIG } from './constants/scroll-config.constant';
import DB_CONFIG from './db.config';
import { authorizationInterceptor } from './interceptors/authorization.interceptor';
import { AuthService } from './routes/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authorizationInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling(SCROLL_CONFIG),
    ),
    provideIndexedDb(DB_CONFIG),
    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.colorunblind-dark',
        },
      },
    }),
    provideAppInitializer(async () => {
      return await inject(AuthService).isUserLoggedIn();
    }),
  ],
};
