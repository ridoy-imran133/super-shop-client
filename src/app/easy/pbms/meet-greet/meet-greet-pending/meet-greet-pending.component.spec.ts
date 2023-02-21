import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetGreetPendingComponent } from './meet-greet-pending.component';

describe('MeetGreetPendingComponent', () => {
  let component: MeetGreetPendingComponent;
  let fixture: ComponentFixture<MeetGreetPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetGreetPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetGreetPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
