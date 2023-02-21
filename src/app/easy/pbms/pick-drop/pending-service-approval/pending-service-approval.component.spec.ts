import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingServiceApprovalComponent } from './pending-service-approval.component';

describe('PendingServiceApprovalComponent', () => {
  let component: PendingServiceApprovalComponent;
  let fixture: ComponentFixture<PendingServiceApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingServiceApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingServiceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
