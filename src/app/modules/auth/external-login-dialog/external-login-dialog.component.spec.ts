import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLoginDialogComponent } from './external-login-dialog.component';

describe('ExternalLoginDialogComponent', () => {
  let component: ExternalLoginDialogComponent;
  let fixture: ComponentFixture<ExternalLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
