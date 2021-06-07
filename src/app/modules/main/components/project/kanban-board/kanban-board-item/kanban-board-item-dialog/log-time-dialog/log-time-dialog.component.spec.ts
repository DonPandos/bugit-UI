import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTimeDialogComponent } from './log-time-dialog.component';

describe('LogTimeDialogComponent', () => {
  let component: LogTimeDialogComponent;
  let fixture: ComponentFixture<LogTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogTimeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
