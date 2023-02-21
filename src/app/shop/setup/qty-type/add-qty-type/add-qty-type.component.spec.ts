import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQtyTypeComponent } from './add-qty-type.component';

describe('AddQtyTypeComponent', () => {
  let component: AddQtyTypeComponent;
  let fixture: ComponentFixture<AddQtyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQtyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQtyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
