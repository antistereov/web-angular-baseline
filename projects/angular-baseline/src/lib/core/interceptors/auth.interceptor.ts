import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from 'rxjs';
import { inject } from '@angular/core';
import {UserSessionService} from '@baseline/auth/data-access/user-session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userSessionService = inject(UserSessionService);

    const authReq = req.clone({
        withCredentials: true
    });

    const excludedEndpoints = ['/user/refresh'];

    if (excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
        return next(authReq);
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                return userSessionService.refreshToken().pipe(
                    switchMap(() => {
                        const retriedAuthReq = authReq.clone({
                            withCredentials: true
                        });
                        return next(retriedAuthReq);
                    }),
                    catchError(refreshError => {
                        return throwError(() => refreshError);
                    })
                );
            } else {
                return throwError(() => error);
            }
        })
    )
}
