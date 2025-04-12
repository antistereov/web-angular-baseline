import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDrawerComponent } from './drawer.component';
import {provideHttpClient} from "@angular/common/http";

describe('SidebarComponent', () => {
    let component: AppDrawerComponent;
    let fixture: ComponentFixture<AppDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppDrawerComponent],
            providers: [
                provideHttpClient()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AppDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
