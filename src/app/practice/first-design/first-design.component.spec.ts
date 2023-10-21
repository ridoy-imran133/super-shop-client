import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstDesignComponent } from './first-design.component';

describe('FirstDesignComponent', () => {
  let component: FirstDesignComponent;
  let fixture: ComponentFixture<FirstDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
