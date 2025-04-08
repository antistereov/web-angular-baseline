import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorComponent } from './two-factor.component';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('TwoFactorComponent', () => {
    let component: TwoFactorComponent;
    let fixture: ComponentFixture<TwoFactorComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ redirect: '/' }),
                paramMap: convertToParamMap({ context: 'login' })
            }
        };

        await TestBed.configureTestingModule({
            imports: [
                TwoFactorComponent,
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

        fixture = TestBed.createComponent(TwoFactorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
