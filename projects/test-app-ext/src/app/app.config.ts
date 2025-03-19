import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {authInterceptor} from '@baseline-ext/auth/interceptors/auth.interceptor';
import {APP_CONFIG} from '@baseline-ext/angular-baseline/core/lib.config';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(
          withFetch(),
          withInterceptors([authInterceptor])
      ),
      { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://localhost:8000', enableLogging: true }}
  ]
};
