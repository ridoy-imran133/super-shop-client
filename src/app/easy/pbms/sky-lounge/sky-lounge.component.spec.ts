import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyLoungeComponent } from './sky-lounge.component';

describe('SkyLoungeComponent', () => {
  let component: SkyLoungeComponent;
  let fixture: ComponentFixture<SkyLoungeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyLoungeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
