import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeComponent } from './me.component';
import {provideHttpClient} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap} from "@angular/router";

describe('MeComponent', () => {
    let component: MeComponent;
    let fixture: ComponentFixture<MeComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                queryParamMap: convertToParamMap({ 'step-up': '/' }),
            }
        };

        await TestBed.configureTestingModule({
            imports: [MeComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideHttpClient()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
