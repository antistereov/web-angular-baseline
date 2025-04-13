import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsCard } from './user-settings-card.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";

describe('AdvancedUserSettingsComponent', () => {
    let component: UserSettingsCard;
    let fixture: ComponentFixture<UserSettingsCard>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ 'step-up': '/' }),
            }
        };

        await TestBed.configureTestingModule({
            imports: [UserSettingsCard],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideHttpClient()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserSettingsCard);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
