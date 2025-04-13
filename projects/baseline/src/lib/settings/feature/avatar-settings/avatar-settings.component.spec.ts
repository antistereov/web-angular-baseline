import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSettingsComponent } from './avatar-settings.component';
import {provideHttpClient} from "@angular/common/http";

describe('AvatarSettingsComponent', () => {
    let component: AvatarSettingsComponent;
    let fixture: ComponentFixture<AvatarSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarSettingsComponent],
            providers: [provideHttpClient()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AvatarSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
