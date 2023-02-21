import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPickDropComponent } from './add-pick-drop.component';

describe('AddPickDropComponent', () => {
  let component: AddPickDropComponent;
  let fixture: ComponentFixture<AddPickDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPickDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPickDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
