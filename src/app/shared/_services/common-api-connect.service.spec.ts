import { TestBed } from '@angular/core/testing';

import { CommonApiConnectService } from './common-api-connect.service';

describe('CommonApiConnectService', () => {
  let service: CommonApiConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonApiConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
