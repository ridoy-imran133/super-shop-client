import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateUpdateComponent } from './date-update.component';

describe('DateUpdateComponent', () => {
  let component: DateUpdateComponent;
  let fixture: ComponentFixture<DateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
