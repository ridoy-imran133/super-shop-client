import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMgApprovalComponent } from './add-mg-approval.component';

describe('AddMgApprovalComponent', () => {
  let component: AddMgApprovalComponent;
  let fixture: ComponentFixture<AddMgApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMgApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMgApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
