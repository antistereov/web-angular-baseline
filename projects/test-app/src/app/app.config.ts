import { ApplicationConfig } from '@angular/core';
import {provideBaseline} from '@baseline/core/config/base.config';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
      provideBaseline(),
      provideRouter(routes)
  ]
};
