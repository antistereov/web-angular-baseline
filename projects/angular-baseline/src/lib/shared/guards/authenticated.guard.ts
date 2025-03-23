import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@baseline/auth/data-access/auth.service';
import {catchError, of, switchMap} from 'rxjs';

export const authenticatedGuard: CanActivateFn = () => {
    const userSessionService = inject(AuthService);
    const router = inject(Router);

    return userSessionService.initializeUser().pipe(
        switchMap(() => {
            return of(true);
        }),
        catchError(() => {
            userSessionService.invalidateUser();
            router.navigate(['/']).then();
            return of(false);
        })
    )
}
