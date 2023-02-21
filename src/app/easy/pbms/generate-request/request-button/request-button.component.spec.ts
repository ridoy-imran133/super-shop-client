import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestButtonComponent } from './request-button.component';

describe('RequestButtonComponent', () => {
  let component: RequestButtonComponent;
  let fixture: ComponentFixture<RequestButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
