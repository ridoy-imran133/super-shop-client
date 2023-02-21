import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkyLoungeComponent } from './add-sky-lounge.component';

describe('AddSkyLoungeComponent', () => {
  let component: AddSkyLoungeComponent;
  let fixture: ComponentFixture<AddSkyLoungeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkyLoungeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkyLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
