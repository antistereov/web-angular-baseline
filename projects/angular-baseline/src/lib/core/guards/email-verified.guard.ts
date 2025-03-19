import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserSessionService} from '../../auth/data-access/user-session.service';
import {catchError, of, switchMap} from 'rxjs';

export const emailVerifiedGuard: CanActivateFn = () => {
    const userSessionService = inject(UserSessionService);
    const router = inject(Router);

    return userSessionService.getUser().pipe(
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
