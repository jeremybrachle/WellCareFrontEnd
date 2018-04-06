import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HippaComponent } from './hippa.component';

describe('HippaComponent', () => {
  let component: HippaComponent;
  let fixture: ComponentFixture<HippaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HippaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HippaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
