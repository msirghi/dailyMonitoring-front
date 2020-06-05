import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsOptionsComponent } from './projects-options.component';

describe('ProjectsOptionsComponent', () => {
  let component: ProjectsOptionsComponent;
  let fixture: ComponentFixture<ProjectsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
