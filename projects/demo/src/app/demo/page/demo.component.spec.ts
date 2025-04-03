import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DemoComponent} from './demo.component';
import {provideHttpClient} from "@angular/common/http";
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";

describe('DemoComponent', () => {
    let component: DemoComponent;
    let fixture: ComponentFixture<DemoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                DemoComponent,
                TranslateModule.forRoot({ // Properly configure ngx-translate
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ],
            providers: [provideHttpClient()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
