import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorSettingsComponent } from './two-factor-settings.component';
import {provideHttpClient} from "@angular/common/http";

describe('TwoFactorSettingsComponent', () => {
    let component: TwoFactorSettingsComponent;
    let fixture: ComponentFixture<TwoFactorSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TwoFactorSettingsComponent],
            providers: [provideHttpClient()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TwoFactorSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
