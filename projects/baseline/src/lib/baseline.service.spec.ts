import { TestBed } from '@angular/core/testing';

import { BaselineService } from './baseline.service';

describe('BaselineService', () => {
  let service: BaselineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaselineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
