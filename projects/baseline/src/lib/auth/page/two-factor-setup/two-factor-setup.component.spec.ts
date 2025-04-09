import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorSetupComponent } from './two-factor-setup.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('TwoFactorSetupComponent', () => {
    let component: TwoFactorSetupComponent;
    let fixture: ComponentFixture<TwoFactorSetupComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ redirect: '/' })
            }
        };

        await TestBed.configureTestingModule({
            imports: [
                TwoFactorSetupComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ],
            providers: [
                provideHttpClient(),
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TwoFactorSetupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
