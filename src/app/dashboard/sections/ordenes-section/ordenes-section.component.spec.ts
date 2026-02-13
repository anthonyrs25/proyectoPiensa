import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrdenesSectionComponent } from './ordenes-section.component';

describe('OrdenesSectionComponent', () => {
  let component: OrdenesSectionComponent;
  let fixture: ComponentFixture<OrdenesSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrdenesSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
