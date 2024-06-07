import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    switchMap(val => {
      if (!val) router.navigate(['']);
      return of(val);
    }),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  )
};
