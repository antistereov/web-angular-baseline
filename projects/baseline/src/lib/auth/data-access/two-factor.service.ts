import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASELINE_CONFIG} from "@baseline/core/config/base.config";
import {UserService} from "@baseline/shared/data-access/user.service";
import {Observable, take, tap} from "rxjs";
import {
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

    recover(code: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/recovery?code=${code}`, {}).pipe(
            take(1)
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
            take(1),
            tap((res) => {
                this.userService.login2faVerificationNeeded.set(res.twoFactorRequired)
            })
        )
    }
}
