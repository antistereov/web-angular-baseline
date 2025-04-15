import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorRecoveryComponent } from './two-factor-recovery.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";

describe('TwoFactorRecoveryComponent', () => {
    let component: TwoFactorRecoveryComponent;
    let fixture: ComponentFixture<TwoFactorRecoveryComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ context: 'login' }),
            }
        };

        await TestBed.configureTestingModule({
            imports: [TwoFactorRecoveryComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideHttpClient()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TwoFactorRecoveryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
