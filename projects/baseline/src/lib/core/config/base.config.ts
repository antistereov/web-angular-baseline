import {
    inject,
    InjectionToken,
    provideZoneChangeDetection
} from '@angular/core';
import config from 'base.config.json'
import {UserService} from '@baseline/shared/data-access/user.service';
import {ColorSchemeService} from '@baseline/settings/util/color-scheme.service';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {authInterceptor} from '@baseline/core/interceptor/auth.interceptor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {primeConfig} from '@baseline/core/config/prime.config';
import {provideErrorHandler} from '@baseline/core/error/error.provider';
import {ConfirmationService, MessageService} from 'primeng/api';
import {provideTranslateService} from '@baseline/core/translate/translate-provider';
import {authRoutes} from '@baseline/auth/page/auth.routes';
import {LanguageService} from "@baseline/core/translate/language.service";

export interface BaselineConfig {
    apiBaseUrl: string;
    enableLogging: boolean;
    auth: {
        allowRegister: boolean;
        redirect: {
            login: string;
            register: string;
            verifyMail: string;
        },
        requireName: boolean
    }
}

const DEFAULT_CONFIG: BaselineConfig = {
    apiBaseUrl: 'http://localhost:8000',
    enableLogging: false,
    auth: {
        allowRegister: true,
        redirect: {
            login: '/',
            register: '/',
            verifyMail: '/'
        },
        requireName: true
    }
};

function mergeConfig<T extends Record<string, any>>(defaultConfig: T, customConfig: any): T {
    return Object.keys(defaultConfig).reduce((acc, key) => {
        type Key = keyof T;
        const defaultValue = defaultConfig[key as Key];
        const customValue = customConfig[key as Key];

        if (customValue !== undefined) {
            if (
                typeof defaultValue === 'object' &&
                defaultValue !== null &&
                typeof customValue === 'object' &&
                customValue !== null
            ) {
                acc[key as Key] = mergeConfig(defaultValue, customValue) as T[Key];
            } else {
                acc[key as Key] = customValue as T[Key];
            }
        } else {
            acc[key as Key] = defaultValue;
        }

        return acc;
    }, { ...defaultConfig } as T);
}

const mergedConfig: BaselineConfig = mergeConfig(DEFAULT_CONFIG, config)

export const BASELINE_CONFIG = new InjectionToken<BaselineConfig>('BASELINE_CONFIG', {
    providedIn: 'root',
    factory: () => mergedConfig
})

export function provideBaseline() {
    return [
        {
            provide: BASELINE_CONFIG,
            useValue: mergedConfig
        },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(authRoutes),
        provideHttpClient(
            withFetch(),
            withInterceptors([authInterceptor])
        ),
        provideAnimationsAsync(),
        providePrimeNG(primeConfig),
        provideErrorHandler(),
        provideTranslateService(),
        MessageService,
        ConfirmationService,
    ];
}

export function initializeBaseline() {
    inject(UserService);
    inject(ColorSchemeService);
    inject(MessageService);
    inject(LanguageService);
}
