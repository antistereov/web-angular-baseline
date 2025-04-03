import {TestBed} from '@angular/core/testing';

import {MailVerificationService} from './mail-verification.service';
import {provideHttpClient} from "@angular/common/http";

describe('MailVerificationService', () => {
    let service: MailVerificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
        });
        service = TestBed.inject(MailVerificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
