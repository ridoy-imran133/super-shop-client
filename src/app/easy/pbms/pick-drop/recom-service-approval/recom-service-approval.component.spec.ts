import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomServiceApprovalComponent } from './recom-service-approval.component';

describe('RecomServiceApprovalComponent', () => {
  let component: RecomServiceApprovalComponent;
  let fixture: ComponentFixture<RecomServiceApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomServiceApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomServiceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
