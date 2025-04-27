import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../routes/auth/auth.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.loggedIn()) {
    const tokens = authService.getTokens();
    if (tokens) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
    }
  }
  return next(req).pipe(
    tap({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (authService.loggedIn()) {
            const tokens = authService.getTokens();
            if (tokens) {
              authService.refreshToken(tokens);
            } else {
              authService.logout();
            }
          }
        }
      },
    }),
  );
};
