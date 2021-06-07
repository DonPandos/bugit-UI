import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDashboardItemComponent } from './workspace-dashboard-item.component';

describe('WorkspaceDashboardItemComponent', () => {
  let component: WorkspaceDashboardItemComponent;
  let fixture: ComponentFixture<WorkspaceDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceDashboardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
