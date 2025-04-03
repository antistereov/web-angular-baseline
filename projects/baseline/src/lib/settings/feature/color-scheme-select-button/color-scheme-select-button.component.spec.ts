import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeSelectButtonComponent } from './color-scheme-select-button.component';

describe('ColorSchemeSelectButtonComponent', () => {
    let component: ColorSchemeSelectButtonComponent;
    let fixture: ComponentFixture<ColorSchemeSelectButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ColorSchemeSelectButtonComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ColorSchemeSelectButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
