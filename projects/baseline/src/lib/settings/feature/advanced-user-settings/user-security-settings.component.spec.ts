import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSecuritySettings } from './user-security-settings.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";

describe('AdvancedUserSettingsComponent', () => {
    let component: UserSecuritySettings;
    let fixture: ComponentFixture<UserSecuritySettings>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ 'step-up': '/' }),
            }
        };

        await TestBed.configureTestingModule({
            imports: [UserSecuritySettings],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideHttpClient()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserSecuritySettings);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
