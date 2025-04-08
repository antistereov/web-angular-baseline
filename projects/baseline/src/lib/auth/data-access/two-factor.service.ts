import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASELINE_CONFIG} from "@baseline/core/config/base.config";
import {UserService} from "@baseline/shared/data-access/user.service";
import {Observable, tap} from "rxjs";
import {TwoFactorSetupResponse, TwoFactorStatusResponse} from "@baseline/auth/model/two-factor.model";
import {User} from "@baseline/shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class TwoFactorService {
    private httpClient = inject(HttpClient);
    private apiBaseUrl = inject(BASELINE_CONFIG).apiBaseUrl
    private userService = inject(UserService);

    setup(): Observable<TwoFactorSetupResponse> {
        return this.httpClient.post<TwoFactorSetupResponse>(`${this.apiBaseUrl}/user/2fa/setup`, {})
    }

    verifyCode(code: number): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/verify?code=${code}`, {}).pipe(
            tap((user) => {
                this.userService.setUser(user);
            })
        );
    }

    getStatus(): Observable<TwoFactorStatusResponse> {
        return this.httpClient.get<TwoFactorStatusResponse>(`${this.apiBaseUrl}/user/2fa/status`).pipe(
            tap((res) => {
                this.userService.twoFactorAuthNeeded.set(res.twoFactorRequired)
            })
        )
    }

}
