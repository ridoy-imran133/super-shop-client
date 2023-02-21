import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmUpdateComponent } from './rm-update.component';

describe('RmUpdateComponent', () => {
  let component: RmUpdateComponent;
  let fixture: ComponentFixture<RmUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
