import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardItemDialogComponent } from './kanban-board-item-dialog.component';

describe('KanbanBoardItemDialogComponent', () => {
  let component: KanbanBoardItemDialogComponent;
  let fixture: ComponentFixture<KanbanBoardItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
