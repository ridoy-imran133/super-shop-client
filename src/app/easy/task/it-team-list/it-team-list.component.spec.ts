import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItTeamListComponent } from './it-team-list.component';

describe('ItTeamListComponent', () => {
  let component: ItTeamListComponent;
  let fixture: ComponentFixture<ItTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
