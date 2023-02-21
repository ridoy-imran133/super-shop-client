import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetGreetChartComponent } from './meet-greet-chart.component';

describe('MeetGreetChartComponent', () => {
  let component: MeetGreetChartComponent;
  let fixture: ComponentFixture<MeetGreetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetGreetChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetGreetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
