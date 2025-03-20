import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {APP_CONFIG} from '@baseline/core/lib.config';
import {User} from '@baseline/shared/models/user.model';
import {DeviceService} from '@baseline/auth/utils/device.service';
import {Router} from '@angular/router';
import {
    LoginCredentials,
    LoginRequest,
    LoginResponse,
    RegisterInformation,
    RegisterUserRequest
} from '../../auth/models/user-session.model';
import {UserService} from '../../shared/data-access/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
    private httpClient = inject(HttpClient);
    private deviceService = inject(DeviceService);
    private router = inject(Router);
    private userService = inject(UserService);

    private apiBaseUrl = inject(APP_CONFIG).apiBaseUrl;

    getUser(): Observable<User> {
        return this.httpClient
            .get<User>(`${this.apiBaseUrl}/user/me`)
            .pipe(
                tap(user => this.userService.setUser(user))
            )
    }

    invalidateUser() {
        this.userService.clearUser();
    }

    login(credentials: LoginCredentials): Observable<User> {
        const device = this.deviceService.getDeviceInfo();
        const loginRequest: LoginRequest = { ...credentials, device};

        return this.httpClient
            .post<LoginResponse>(`${this.apiBaseUrl}/user/login`, loginRequest)
            .pipe(
                map(res => this.handleLoginResponse(res)),
                tap(user => this.userService.setUser(user))
            )
    }

    private handleLoginResponse(res: LoginResponse): User {
        if (res.twoFactorRequired) {
            this.router.navigate(['auth/2fa']).then();
        }

        return res.user;
    }

    register(info: RegisterInformation): Observable<User> {
        const device = this.deviceService.getDeviceInfo();
        const registerRequest: RegisterUserRequest = { ...info, device };

        return this.httpClient
            .post<User>(`${this.apiBaseUrl}/user/register`, registerRequest)
            .pipe(
                tap(user => this.userService.setUser(user))
            )
    }

    logout(): Observable<any> {
        const device = this.deviceService.getDeviceInfo();

        return this.httpClient
            .post<any>(`${this.apiBaseUrl}/user/logout`, device)
            .pipe(
                tap(() => this.userService.setUser(undefined))
            )
    }

    refreshToken(): Observable<User> {
        const device = this.deviceService.getDeviceInfo();

        return this.httpClient
            .post<User>(`${this.apiBaseUrl}/user/refresh`, device)
            .pipe(
                tap(user => this.userService.setUser(user))
            )
    }

    delete(): Observable<any> {
        return this.httpClient
            .delete<any>(`${this.apiBaseUrl}/user/me`)
            .pipe(
                tap(() => this.userService.setUser(undefined))
            )
    }
}
