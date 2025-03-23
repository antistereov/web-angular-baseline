import {inject, InjectionToken, Provider} from '@angular/core';
import config from 'base.config.json'
import {AuthService} from '@baseline/auth/data-access/auth.service';
import {ColorSchemeService} from '@baseline/settings/utils/color-scheme.service';
import {LanguageService} from '@baseline/settings/utils/language.service';

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

export function provideBaselineConfig(): Provider {
    return {
        provide: BASELINE_CONFIG,
        useValue: mergedConfig
    };
}

export function initializeBaseline() {
    const authService = inject(AuthService);
    inject(ColorSchemeService);
    inject(LanguageService);
    authService.initializeUser().subscribe();
}
