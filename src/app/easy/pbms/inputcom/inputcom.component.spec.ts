import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputcomComponent } from './inputcom.component';

describe('InputcomComponent', () => {
  let component: InputcomComponent;
  let fixture: ComponentFixture<InputcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputcomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
