import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProformasSectionComponent } from './proformas-section.component';

describe('ProformasSectionComponent', () => {
  let component: ProformasSectionComponent;
  let fixture: ComponentFixture<ProformasSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProformasSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProformasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
