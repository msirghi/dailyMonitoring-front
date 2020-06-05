import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPersonalActivityComponent } from './last-personal-activity.component';

describe('LastPersonalActivityComponent', () => {
  let component: LastPersonalActivityComponent;
  let fixture: ComponentFixture<LastPersonalActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastPersonalActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastPersonalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
