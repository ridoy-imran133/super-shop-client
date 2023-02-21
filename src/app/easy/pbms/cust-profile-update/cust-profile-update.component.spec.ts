import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustProfileUpdateComponent } from './cust-profile-update.component';

describe('CustProfileUpdateComponent', () => {
  let component: CustProfileUpdateComponent;
  let fixture: ComponentFixture<CustProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
