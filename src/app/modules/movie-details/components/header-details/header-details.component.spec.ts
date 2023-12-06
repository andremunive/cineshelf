import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDetailsComponent } from './header-details.component';

describe('HeaderDetailsComponent', () => {
  let component: HeaderDetailsComponent;
  let fixture: ComponentFixture<HeaderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderDetailsComponent]
    });
    fixture = TestBed.createComponent(HeaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
