import {TestBed} from '@angular/core/testing';

import {UserSettingsService} from './user-settings.service';
import {provideHttpClient} from "@angular/common/http";

describe('UserSettingsService', () => {
    let service: UserSettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        });
        service = TestBed.inject(UserSettingsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
