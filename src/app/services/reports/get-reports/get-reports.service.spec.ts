import { TestBed } from '@angular/core/testing';

import { GetReportsService } from './get-reports.service';

describe('GetReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetReportsService = TestBed.get(GetReportsService);
    expect(service).toBeTruthy();
  });
});
