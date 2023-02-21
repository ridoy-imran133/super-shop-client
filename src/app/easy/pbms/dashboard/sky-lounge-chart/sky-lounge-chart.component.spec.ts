import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyLoungeChartComponent } from './sky-lounge-chart.component';

describe('SkyLoungeChartComponent', () => {
  let component: SkyLoungeChartComponent;
  let fixture: ComponentFixture<SkyLoungeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyLoungeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyLoungeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
