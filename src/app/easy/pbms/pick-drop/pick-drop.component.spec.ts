import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDropComponent } from './pick-drop.component';

describe('PickDropComponent', () => {
  let component: PickDropComponent;
  let fixture: ComponentFixture<PickDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
