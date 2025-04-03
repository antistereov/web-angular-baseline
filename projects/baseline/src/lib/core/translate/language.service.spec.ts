import {TestBed} from '@angular/core/testing';

import {LanguageService} from './language.service';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('LanguageService', () => {
    let service: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({ // Properly configure ngx-translate
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ]
        });
        service = TestBed.inject(LanguageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
