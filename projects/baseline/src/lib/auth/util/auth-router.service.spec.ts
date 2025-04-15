import { TestBed } from '@angular/core/testing';

import { AuthRouterService } from './auth-router.service';

describe('AuthRouterService', () => {
  let service: AuthRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
