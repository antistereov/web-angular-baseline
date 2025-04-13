import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelComponent} from './panel.component';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PanelComponent],
            providers: [provideAnimationsAsync()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
