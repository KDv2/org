import { TestBed } from '@angular/core/testing';

import { SetReportsService } from './set-reports.service';

describe('SetReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetReportsService = TestBed.get(SetReportsService);
    expect(service).toBeTruthy();
  });
});
