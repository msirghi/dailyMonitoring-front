import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoStatisticsComponent } from './no-statistics.component';

describe('NoStatisticsComponent', () => {
  let component: NoStatisticsComponent;
  let fixture: ComponentFixture<NoStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
