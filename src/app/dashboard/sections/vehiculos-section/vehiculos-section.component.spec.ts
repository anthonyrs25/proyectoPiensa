import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VehiculosSectionComponent } from './vehiculos-section.component';

describe('VehiculosSectionComponent', () => {
  let component: VehiculosSectionComponent;
  let fixture: ComponentFixture<VehiculosSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VehiculosSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
