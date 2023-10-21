import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExportComponent } from './test-export.component';

describe('TestExportComponent', () => {
  let component: TestExportComponent;
  let fixture: ComponentFixture<TestExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
