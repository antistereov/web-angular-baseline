import {InjectionToken} from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
    providedIn: 'root',
    factory: () => ({
        apiBaseUrl: 'http://localhost:8000',
        enableLogging: false,
        loginRedirectUrl: '/',
    })
})

export interface AppConfig {
    apiBaseUrl: string;
    enableLogging: boolean;
    loginRedirectUrl: string;
}
