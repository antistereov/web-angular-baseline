import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {provideHttpClient} from "@angular/common/http";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient()]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
