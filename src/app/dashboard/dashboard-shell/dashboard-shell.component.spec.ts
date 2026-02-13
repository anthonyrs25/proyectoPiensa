import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardShellComponent } from './dashboard-shell.component';

describe('DashboardShellComponent', () => {
  let component: DashboardShellComponent;
  let fixture: ComponentFixture<DashboardShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DashboardShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
