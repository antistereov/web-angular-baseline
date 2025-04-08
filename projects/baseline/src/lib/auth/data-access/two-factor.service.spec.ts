import { TestBed } from '@angular/core/testing';

import { TwoFactorService } from './two-factor.service';
import {provideHttpClient} from "@angular/common/http";

describe('TwoFactorService', () => {
  let service: TwoFactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideHttpClient()]
    });
    service = TestBed.inject(TwoFactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
