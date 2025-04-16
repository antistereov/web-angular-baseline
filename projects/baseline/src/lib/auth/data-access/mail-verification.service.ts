import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASELINE_CONFIG} from '@baseline/core/config/base.config';
import {map, Observable, tap} from 'rxjs';
import {MailVerificationCooldownResponse} from '@baseline/auth/model/email-verification.model';
import {UserService} from '@baseline/shared/data-access/user.service';
import {User} from "@baseline/shared/model/user.model";

@Injectable({
    providedIn: 'root'
})
export class MailVerificationService {
    private http = inject(HttpClient);
    private baselineConfig = inject(BASELINE_CONFIG);
    private apiBaseUrl = this.baselineConfig.apiBaseUrl;
    private userService = inject(UserService);

    verifyEmail(token: string): Observable<User> {
        return this.http.post<User>(`${this.apiBaseUrl}/user/mail/verify?token=${token}`, {}).pipe(
            tap(user => this.userService.setUser(user))
        );
    }

    resendVerificationEmail(): Observable<void> {
        return this.http.post<any>(`${this.apiBaseUrl}/user/mail/verify/send`, {});
    }

    getRemainingCooldown(): Observable<number> {
        return this.http.get<MailVerificationCooldownResponse>(`${this.apiBaseUrl}/user/mail/verify/cooldown`)
            .pipe(map(response => response.remaining));
    }
}
