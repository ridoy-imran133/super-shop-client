import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryOneComponent } from './try-one.component';

describe('TryOneComponent', () => {
  let component: TryOneComponent;
  let fixture: ComponentFixture<TryOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
