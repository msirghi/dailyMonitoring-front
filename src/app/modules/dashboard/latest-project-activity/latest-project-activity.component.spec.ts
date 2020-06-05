import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestProjectActivityComponent } from './latest-project-activity.component';

describe('LatestProjectActivityComponent', () => {
  let component: LatestProjectActivityComponent;
  let fixture: ComponentFixture<LatestProjectActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestProjectActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
