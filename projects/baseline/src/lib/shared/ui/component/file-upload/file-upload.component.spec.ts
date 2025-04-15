import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileUploadComponent} from './file-upload.component';
import {provideHttpClient} from "@angular/common/http";

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FileUploadComponent],
            providers: [provideHttpClient()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
