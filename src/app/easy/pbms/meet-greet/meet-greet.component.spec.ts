import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetGreetComponent } from './meet-greet.component';

describe('MeetGreetComponent', () => {
  let component: MeetGreetComponent;
  let fixture: ComponentFixture<MeetGreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetGreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetGreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
