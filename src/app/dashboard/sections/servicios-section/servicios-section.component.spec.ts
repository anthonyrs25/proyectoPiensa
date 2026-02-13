import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiciosSectionComponent } from './servicios-section.component';

describe('ServiciosSectionComponent', () => {
  let component: ServiciosSectionComponent;
  let fixture: ComponentFixture<ServiciosSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ServiciosSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
