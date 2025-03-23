import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideBaselineConfig} from '@baseline/core/config/base.config';
import {authInterceptor} from '@baseline/core/interceptors/auth.interceptor'
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {primeConfig} from '@baseline/core/theme/prime.config';
import {provideErrorHandler} from '@baseline/core/error/error.provider';
import {MessageService} from 'primeng/api';
import {provideTranslateService} from '@baseline/core/translate/translate-provider';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(
          withFetch(),
          withInterceptors([authInterceptor])
      ),
      provideBaselineConfig(),
      provideAnimationsAsync(),
      providePrimeNG(primeConfig),
      provideErrorHandler(),
      MessageService,
      provideTranslateService()
  ]
};
