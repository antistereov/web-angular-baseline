import {inject, Injectable} from '@angular/core';
import {UserService} from "@baseline/shared/data-access/user.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ChangeEmailRequest, ChangePasswordRequest} from "@baseline/settings/model/user-security.model";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {FileResource, User} from "@baseline/shared/models/user.model";
import {BASELINE_CONFIG} from "@baseline/core/config/base.config";

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    private userService = inject(UserService);
    private httpClient = inject(HttpClient);
    private apiBaseUrl = inject(BASELINE_CONFIG).apiBaseUrl;

    setAvatar(avatar: File): Observable<User> {
        const form = new FormData()
        form.append('file', avatar)
        return this.httpClient.put<User>(`${this.apiBaseUrl}/user/me/avatar`, form).pipe(
            tap((user) => this.userService.setUser(user))
        )
    }

    deleteAvatar(): Observable<User> {
        return this.httpClient.delete<User>(`${this.apiBaseUrl}/user/me/avatar`).pipe(
            tap((user) => this.userService.setUser(user))
        );
    }

    changeEmail(req: ChangeEmailRequest): Observable<User> {
        return this.httpClient.put<User>(`${this.apiBaseUrl}/user/me/email`, req).pipe(
            tap((user) => this.userService.setUser(user))
        );
    }

    changePassword(req: ChangePasswordRequest): Observable<User> {
        return this.httpClient.put<User>(`${this.apiBaseUrl}/user/me/password`, req).pipe(
            tap((user) => this.userService.setUser(user))
        );
    }
}
