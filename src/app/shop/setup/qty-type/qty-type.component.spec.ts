import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyTypeComponent } from './qty-type.component';

describe('QtyTypeComponent', () => {
  let component: QtyTypeComponent;
  let fixture: ComponentFixture<QtyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
