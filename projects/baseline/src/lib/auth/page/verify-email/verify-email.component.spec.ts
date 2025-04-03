import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VerifyEmailComponent} from './verify-email.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {provideHttpClient} from "@angular/common/http";

describe('VerifyEmailComponent', () => {
    let component: VerifyEmailComponent;
    let fixture: ComponentFixture<VerifyEmailComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            queryParams: of({ email: 'test@example.com' })
        };

        await TestBed.configureTestingModule({
            imports: [VerifyEmailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideHttpClient()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(VerifyEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
