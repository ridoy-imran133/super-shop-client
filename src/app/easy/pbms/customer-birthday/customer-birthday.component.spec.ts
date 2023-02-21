import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBirthdayComponent } from './customer-birthday.component';

describe('CustomerBirthdayComponent', () => {
  let component: CustomerBirthdayComponent;
  let fixture: ComponentFixture<CustomerBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBirthdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
