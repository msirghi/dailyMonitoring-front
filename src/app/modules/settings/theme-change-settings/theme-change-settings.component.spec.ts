import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeChangeSettingsComponent } from './theme-change-settings.component';

describe('ThemeChangeSettingsComponent', () => {
  let component: ThemeChangeSettingsComponent;
  let fixture: ComponentFixture<ThemeChangeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeChangeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeChangeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
