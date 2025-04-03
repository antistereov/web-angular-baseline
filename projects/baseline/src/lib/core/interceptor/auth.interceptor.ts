import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from 'rxjs';
import {inject, Injector} from '@angular/core';
import {UserService} from '@baseline/shared/data-access/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const injector = inject(Injector);

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
                const userService = injector.get(UserService);

                return userService.refreshToken().pipe(
                    switchMap(() => next(authReq))
                );
            } else {
                return throwError(() => error);
            }
        })
    )
}
