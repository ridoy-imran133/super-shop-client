import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWiseServiceRequestComponent } from './user-wise-service-request.component';

describe('UserWiseServiceRequestComponent', () => {
  let component: UserWiseServiceRequestComponent;
  let fixture: ComponentFixture<UserWiseServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWiseServiceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWiseServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
