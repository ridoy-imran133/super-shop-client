import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmChangeComponent } from './rm-change.component';

describe('RmChangeComponent', () => {
  let component: RmChangeComponent;
  let fixture: ComponentFixture<RmChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
