import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetGteetSuccessComponent } from './meet-gteet-success.component';

describe('MeetGteetSuccessComponent', () => {
  let component: MeetGteetSuccessComponent;
  let fixture: ComponentFixture<MeetGteetSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetGteetSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetGteetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
