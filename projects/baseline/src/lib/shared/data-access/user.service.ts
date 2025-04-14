import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, take, tap, throwError} from 'rxjs';
import {BASELINE_CONFIG} from '@baseline/core/config/base.config';
import {DeviceService} from '@baseline/auth/util/device.service';
import {Router} from '@angular/router';
import {
    LoginCredentials,
    LoginRequest,
    LoginResponse,
    RegisterInformation,
    RegisterUserRequest
} from '@baseline/auth/model/user-session.model';
import {User} from "@baseline/shared/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private httpClient = inject(HttpClient);
    private deviceService = inject(DeviceService);
    private router = inject(Router);

    private baselineConfig = inject(BASELINE_CONFIG);
    private apiBaseUrl = this.baselineConfig.apiBaseUrl;
    private redirectTo = this.baselineConfig.auth.redirect.login;

    private _user = signal<User | undefined>(undefined);
    private _userLoaded = signal<boolean>(false);
    avatar = computed(() => this.user()?.avatar)

    loggedIn = computed(() => this._user() !== undefined);

    get user(): Signal<User | undefined> {
        return this._user;
    }
    get userLoaded(): Signal<boolean> {
        return this._userLoaded;
    }

    constructor() {
        this.initializeUser();
    }

    setUser(user: User | undefined) {
        this._user.set(user);
    }

    initializeUser(): void {
        this.httpClient.get<User>(`${this.apiBaseUrl}/user/me`).pipe(
            take(1),
            tap(user => {
                this._userLoaded.set(true);
                this.setUser(user);

                if (!user.emailVerified) {
                    this.router.navigate(['/auth/verify-email']).then();
                }
            }),
            catchError(() => {
                this._userLoaded.set(true);
                this.setUser(undefined);
                return of();
            })
        ).subscribe();
    }

    login(credentials: LoginCredentials): Observable<LoginResponse> {
        const device = this.deviceService.getDeviceInfo();
        const loginRequest: LoginRequest = { ...credentials, device};

        return this.httpClient.post<LoginResponse>(`${this.apiBaseUrl}/user/login`, loginRequest).pipe(
            take(1),
            catchError((err: Error) => {
                this.setUser(undefined);
                return throwError(() => err);
            }),
            tap(res => this.handleLoginResponse(res))
        );
    }

    private handleLoginResponse(res: LoginResponse): User | undefined {
        console.log(res);

        if (res.twoFactorRequired) {
            this.router.navigate(['/auth/2fa/verify'] , { queryParams: { context: 'login' } }).then();

            this.setUser(undefined);
            return undefined;
        }

        this.router.navigate([this.redirectTo]).then();

        this.setUser(res.user);
        return res.user;
    }

    register(info: RegisterInformation): Observable<User> {
        const device = this.deviceService.getDeviceInfo();
        const registerRequest: RegisterUserRequest = { ...info, device };

        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/register`, registerRequest).pipe(
            take(1),
            tap(user => this.setUser(user)),
            catchError((err: Error) => {
                this.setUser(undefined);
                return throwError(() => err);
            })
        );
    }

    logout(): Observable<void> {
        const device = this.deviceService.getDeviceInfo();

         return this.httpClient.post<any>(`${this.apiBaseUrl}/user/logout`, device).pipe(
             take(1),
             tap(() => this.setUser(undefined)),
             catchError((err: Error) => {
                 this.setUser(undefined);
                 return throwError(() => err);
             })
         );
    }

    refreshToken(): Observable<User> {
        const device = this.deviceService.getDeviceInfo();

        return this.httpClient.post<User>(`${this.apiBaseUrl}/user/refresh`, device).pipe(
            take(1),
            tap(user => this.setUser(user)),
            catchError((err: Error) => {
                this.setUser(undefined);
                return throwError(() => err);
            })
        );
    }

    delete(): Observable<User> {
        return this.httpClient.delete<any>(`${this.apiBaseUrl}/user/me`).pipe(
            take(1),
            tap(() => this.setUser(undefined)),
            catchError((err: Error) => {
                this.setUser(undefined);
                return throwError(() => err);
            })
        );
    }
}
