import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLatestProjectActivityComponent } from './no-latest-project-activity.component';

describe('NoLatestProjectActivityComponent', () => {
  let component: NoLatestProjectActivityComponent;
  let fixture: ComponentFixture<NoLatestProjectActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLatestProjectActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLatestProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
