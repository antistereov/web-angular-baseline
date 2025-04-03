import {ErrorHandler, Provider} from '@angular/core';
import {GlobalErrorHandler} from '@baseline/core/error/global-error-handler';

export function provideErrorHandler(): Provider {
    return {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
    };
}
