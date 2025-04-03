import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectComponent} from './language-select.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule,} from "@ngx-translate/core";

describe('LanguageSelectComponent', () => {
    let component: LanguageSelectComponent;
    let fixture: ComponentFixture<LanguageSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LanguageSelectComponent,
                TranslateModule.forRoot({ // Properly configure ngx-translate
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LanguageSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
