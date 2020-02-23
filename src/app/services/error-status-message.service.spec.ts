import { TestBed } from '@angular/core/testing';

import { ErrorStatusMessageService } from './error-status-message.service';

describe('ErrorStatusMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorStatusMessageService = TestBed.get(ErrorStatusMessageService);
    expect(service).toBeTruthy();
  });
});
