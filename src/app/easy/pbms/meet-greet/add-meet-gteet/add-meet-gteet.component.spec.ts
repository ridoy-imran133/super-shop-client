import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetGteetComponent } from './add-meet-gteet.component';

describe('AddMeetGteetComponent', () => {
  let component: AddMeetGteetComponent;
  let fixture: ComponentFixture<AddMeetGteetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetGteetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetGteetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
