import { ApplicationConfig } from '@angular/core';
import {provideBaseline} from '@baseline/core/config/base.config';

export const appConfig: ApplicationConfig = {
  providers: [
      provideBaseline()
  ]
};
