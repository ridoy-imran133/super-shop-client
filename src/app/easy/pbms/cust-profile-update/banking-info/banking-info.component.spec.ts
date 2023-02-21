import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingInfoComponent } from './banking-info.component';

describe('BankingInfoComponent', () => {
  let component: BankingInfoComponent;
  let fixture: ComponentFixture<BankingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
