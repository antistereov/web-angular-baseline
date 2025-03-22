import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {APP_CONFIG} from '@baseline/core/lib.config';
import {authInterceptor} from '@baseline/core/interceptors/auth.interceptor'
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {primeConfig} from '@baseline/core/theme/prime.config';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(
          withFetch(),
          withInterceptors([authInterceptor])
      ),
      { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://localhost:8000', enableLogging: true }},
      provideAnimationsAsync(),
      providePrimeNG(primeConfig)
  ]
};
