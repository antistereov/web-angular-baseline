import {inject, TestBed} from '@angular/core/testing';

import {AlertService} from './alert.service';
import {MessageService} from "primeng/api";

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService, MessageService]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
