import { TestBed } from '@angular/core/testing';

import { SmartTableService } from './smart-table.service';

describe('SmartTableService', () => {
  let service: SmartTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
