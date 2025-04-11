import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorVerifyComponent } from './two-factor-verify.component';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('TwoFactorComponent', () => {
    let component: TwoFactorVerifyComponent;
    let fixture: ComponentFixture<TwoFactorVerifyComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ redirect: '/', context: 'login' }),
            }
        };

        await TestBed.configureTestingModule({
            imports: [
                TwoFactorVerifyComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideHttpClient()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TwoFactorVerifyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
