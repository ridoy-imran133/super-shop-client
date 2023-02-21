import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTryOneComponent } from './add-try-one.component';

describe('AddTryOneComponent', () => {
  let component: AddTryOneComponent;
  let fixture: ComponentFixture<AddTryOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTryOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTryOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
