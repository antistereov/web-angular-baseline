import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BASELINE_CONFIG} from "@baseline/core/config/base.config";
import {UserService} from "@baseline/shared/data-access/user.service";
import {catchError, Observable, take, tap, throwError} from "rxjs";
import {
    DisableTwoFactorRequest,
    TwoFactorSetupRequest,
    TwoFactorSetupResponse,
    TwoFactorStatusResponse
} from "@baseline/auth/model/two-factor.model";
import {User} from "@baseline/shared/models/user.model";
import {DeviceService} from "@baseline/auth/util/device.service";

@Injectable({
  providedIn: 'root'
})
export class TwoFactorService {
    private httpClient = inject(HttpClient);
    private apiBaseUrl = inject(BASELINE_CONFIG).apiBaseUrl
    private userService = inject(UserService);
    private deviceService = inject(DeviceService);

    user = this.userService.user;

    getTwoFactorInfo(): Observable<TwoFactorSetupResponse> {
        return this.httpClient.get<TwoFactorSetupResponse>(`${this.apiBaseUrl}/user/2fa/setup`, {}).pipe(
            take(1)
        )
    }

    setup(code: number, token: string): Observable<User> {
        const req: TwoFactorSetupRequest = { code: code, token: token }

        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/setup`, req).pipe(
            take(1),
            tap((user) => this.userService.setUser(user))
        )
    }

    recover(code: string, context: 'step-up' | 'login'): Observable<User> {
        const device = this.deviceService.getDeviceInfo();

        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/recovery?code=${code}&context=${context}`, device).pipe(
            take(1),
            tap((user) => this.userService.setUser(user))
        )
    }

    verify(code: number, context: 'login' | 'step-up'): Observable<User> {
        const device = this.deviceService.getDeviceInfo()

        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/verify-${context}?code=${code}`, device).pipe(
            take(1),
            tap((user) => {
                this.userService.setUser(user);
            })
        );
    }

    getStatus(context: 'login' | 'step-up'): Observable<TwoFactorStatusResponse> {
        return this.httpClient.get<TwoFactorStatusResponse>(`${this.apiBaseUrl}/user/2fa/${context}-status`).pipe(
            take(1)
        )
    }

    disable(req: DisableTwoFactorRequest): Observable<User | undefined> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/disable`, req).pipe(
            tap((user) => this.userService.setUser(user)),
            catchError((err: HttpErrorResponse) => {
                return throwError(() => err);
            })
        );
    }
}
