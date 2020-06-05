import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsChartsComponent } from './projects-charts.component';

describe('ProjectsChartsComponent', () => {
  let component: ProjectsChartsComponent;
  let fixture: ComponentFixture<ProjectsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
