import { TestBed } from '@angular/core/testing';

import { LocalSessionService } from './local-session.service';

describe('LocalSessionService', () => {
  let service: LocalSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
