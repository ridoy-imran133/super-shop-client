import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRmComponent } from './update-rm.component';

describe('UpdateRmComponent', () => {
  let component: UpdateRmComponent;
  let fixture: ComponentFixture<UpdateRmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
