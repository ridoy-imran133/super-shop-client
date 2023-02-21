import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayCakeChartComponent } from './birthday-cake-chart.component';

describe('BirthdayCakeChartComponent', () => {
  let component: BirthdayCakeChartComponent;
  let fixture: ComponentFixture<BirthdayCakeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayCakeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayCakeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
