import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleInfoComponent } from './lifestyle-info.component';

describe('PersonalInfoComponent', () => {
  let component: LifeStyleInfoComponent;
  let fixture: ComponentFixture<LifeStyleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeStyleInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
