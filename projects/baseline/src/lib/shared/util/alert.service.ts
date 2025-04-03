import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private messageService = inject(MessageService);

    showError(summary: string, detail: string) {
        this.messageService.add({
            severity: 'error',
            summary: summary,
            detail: detail
        })
    }

    showInfo(summary: string, detail: string) {
        this.messageService.add({
            severity: 'info',
            summary: summary,
            detail: detail
        })
    }

    showSuccess(summary: string, detail: string) {
        this.messageService.add({
            severity: 'info',
            summary: summary,
            detail: detail,
        })
    }
}
