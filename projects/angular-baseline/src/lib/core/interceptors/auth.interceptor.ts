import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from 'rxjs';
import { inject } from '@angular/core';
import {AuthService} from '@baseline/auth/data-access/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userSessionService = inject(AuthService);

    const authReq = req.clone({
        withCredentials: true
    });

    const excludedEndpoints = ['/user/refresh', '/user/login'];

    if (excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
        return next(authReq);
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                return userSessionService.refreshToken().pipe(
                    switchMap(() => next(authReq)),
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
