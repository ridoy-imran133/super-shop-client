import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBirthgiftComponent } from './add-birthgift.component';

describe('AddBirthgiftComponent', () => {
  let component: AddBirthgiftComponent;
  let fixture: ComponentFixture<AddBirthgiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBirthgiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBirthgiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
