import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VasServiceComponent } from './vas-service.component';

describe('VasServiceComponent', () => {
  let component: VasServiceComponent;
  let fixture: ComponentFixture<VasServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VasServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VasServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
