import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericUserSettingsComponent } from './generic-user-settings.component';
import {provideHttpClient} from "@angular/common/http";

describe('GenericUserSettingsComponent', () => {
    let component: GenericUserSettingsComponent;
    let fixture: ComponentFixture<GenericUserSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GenericUserSettingsComponent],
            providers: [provideHttpClient()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GenericUserSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
