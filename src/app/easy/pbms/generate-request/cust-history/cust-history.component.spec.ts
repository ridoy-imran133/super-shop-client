import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustHistoryComponent } from './cust-history.component';

describe('CustHistoryComponent', () => {
  let component: CustHistoryComponent;
  let fixture: ComponentFixture<CustHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
