import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleLoaderComponent } from './middle-loader.component';

describe('MiddleLoaderComponent', () => {
  let component: MiddleLoaderComponent;
  let fixture: ComponentFixture<MiddleLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
