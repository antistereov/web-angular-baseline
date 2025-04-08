import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASELINE_CONFIG} from "@baseline/core/config/base.config";
import {UserService} from "@baseline/shared/data-access/user.service";
import {Observable, tap} from "rxjs";
import {TwoFactorSetupResponse, TwoFactorStatusResponse} from "@baseline/auth/model/two-factor.model";
import {User} from "@baseline/shared/models/user.model";
import {StepUpStatusResponse} from "@baseline/auth/model/user-session.model";

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

    recover(code: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/recovery?code=${code}`, {})
    }

    verify(code: number, context: 'login' | 'step-up'): Observable<User> {
        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/2fa/verify-${context}?code=${code}`, {}).pipe(
            tap((user) => {
                this.userService.setUser(user);
            })
        );
    }

    getStatus(context: 'login' | 'step-up'): Observable<TwoFactorStatusResponse> {
        return this.httpClient.get<TwoFactorStatusResponse>(`${this.apiBaseUrl}/user/2fa/${context}-status`).pipe(
            tap((res) => {
                this.userService.twoFactorAuthNeeded.set(res.twoFactorRequired)
            })
        )
    }
}
