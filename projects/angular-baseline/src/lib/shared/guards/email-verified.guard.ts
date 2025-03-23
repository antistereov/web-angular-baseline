import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/data-access/auth.service';
import {catchError, of, switchMap} from 'rxjs';

export const emailVerifiedGuard: CanActivateFn = () => {
    const userSessionService = inject(AuthService);
    const router = inject(Router);

    return userSessionService.initializeUser().pipe(
        switchMap(user => {
            if (!user.emailVerified) {
                router.navigate(['/auth/verify-email']).then();
                return of(false);
            }
            return of(true);
        }),
        catchError(() => {
            userSessionService.invalidateUser();
            router.navigate(['/']).then();
            return of(false);
        })
    )
}
