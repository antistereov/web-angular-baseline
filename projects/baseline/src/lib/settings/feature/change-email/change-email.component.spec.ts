import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailComponent } from './change-email.component';
import {provideHttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

describe('ChangeEmailComponent', () => {
    let component: ChangeEmailComponent;
    let fixture: ComponentFixture<ChangeEmailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChangeEmailComponent],
            providers: [
                provideHttpClient(),
                MessageService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChangeEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
