import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingDialogComponent } from './project-setting-dialog.component';

describe('ProjectSettingDialogComponent', () => {
  let component: ProjectSettingDialogComponent;
  let fixture: ComponentFixture<ProjectSettingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSettingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
