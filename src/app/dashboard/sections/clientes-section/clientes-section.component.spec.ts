import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientesSectionComponent } from './clientes-section.component';

describe('ClientesSectionComponent', () => {
  let component: ClientesSectionComponent;
  let fixture: ComponentFixture<ClientesSectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClientesSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
