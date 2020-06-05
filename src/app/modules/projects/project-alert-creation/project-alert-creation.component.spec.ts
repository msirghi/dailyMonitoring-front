import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAlertCreationComponent } from './project-alert-creation.component';

describe('ProjectAlertCreationComponent', () => {
  let component: ProjectAlertCreationComponent;
  let fixture: ComponentFixture<ProjectAlertCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAlertCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAlertCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
