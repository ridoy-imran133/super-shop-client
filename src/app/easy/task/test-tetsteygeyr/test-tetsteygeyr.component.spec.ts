import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTetsteygeyrComponent } from './test-tetsteygeyr.component';

describe('TestTetsteygeyrComponent', () => {
  let component: TestTetsteygeyrComponent;
  let fixture: ComponentFixture<TestTetsteygeyrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTetsteygeyrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTetsteygeyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
