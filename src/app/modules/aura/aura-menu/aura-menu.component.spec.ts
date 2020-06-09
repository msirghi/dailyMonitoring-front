import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuraMenuComponent } from './aura-menu.component';

describe('AuraMenuComponent', () => {
  let component: AuraMenuComponent;
  let fixture: ComponentFixture<AuraMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuraMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuraMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
