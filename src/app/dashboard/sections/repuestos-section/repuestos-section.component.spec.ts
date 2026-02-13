import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepuestosSectionComponent } from './repuestos-section.component';

describe('RepuestosSectionComponent', () => {
  let component: RepuestosSectionComponent;
  let fixture: ComponentFixture<RepuestosSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RepuestosSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepuestosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
