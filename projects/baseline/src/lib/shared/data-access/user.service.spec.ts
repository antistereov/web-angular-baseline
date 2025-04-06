import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {mockUser} from "../../../../../../setup.jest";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";

describe('UserService', () => {
    let service: UserService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                provideHttpClient(),
                provideHttpClientTesting()
            ],
        });

        service = TestBed.inject(UserService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    })

    it('should be initialized correctly', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();

        expect(service.user()).toBeFalsy();
        expect(service.userLoaded()).toEqual(false);

        const req = httpTestingController.expectOne(`http://localhost:8000/user/me`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);

        expect(service.user()).toEqual(mockUser);
        expect(service.userLoaded()).toEqual(true);
    }));
});
