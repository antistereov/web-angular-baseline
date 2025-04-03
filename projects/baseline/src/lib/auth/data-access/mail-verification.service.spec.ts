import { TestBed } from '@angular/core/testing';

import { MailVerificationService } from './mail-verification.service';

describe('MailVerificationService', () => {
    let service: MailVerificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MailVerificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
