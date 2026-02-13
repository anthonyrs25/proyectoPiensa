import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonalSectionComponent } from './personal-section.component';

describe('PersonalSectionComponent', () => {
  let component: PersonalSectionComponent;
  let fixture: ComponentFixture<PersonalSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PersonalSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
