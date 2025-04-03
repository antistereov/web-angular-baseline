import {ErrorHandler, inject, Injectable} from '@angular/core';
import {AlertService} from '@baseline/shared/util/alert.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private alertService = inject(AlertService);

    handleError(error: Error) {
        this.alertService.showError(error.name, error.message);

        console.error('[GlobalErrorHandler] Unhandled exception:', error);
    }
}
