import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDropChartComponent } from './pick-drop-chart.component';

describe('PickDropChartComponent', () => {
  let component: PickDropChartComponent;
  let fixture: ComponentFixture<PickDropChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickDropChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDropChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
