import { TestBed } from '@angular/core/testing';

import { PermitedMenuService } from './permited-menu.service';

describe('PermitedMenuService', () => {
  let service: PermitedMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermitedMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
