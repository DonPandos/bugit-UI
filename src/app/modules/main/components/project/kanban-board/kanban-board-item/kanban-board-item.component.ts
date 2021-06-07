import {Component, Input, OnInit} from '@angular/core';
import {IssueInterface} from "../../../../domain/issue-interface";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateIssueDialogComponent} from "../../create-issue-dialog/create-issue-dialog.component";
import {KanbanBoardItemDialogComponent} from "./kanban-board-item-dialog/kanban-board-item-dialog.component";

@Component({
  selector: 'app-kanban-board-item',
  templateUrl: './kanban-board-item.component.html',
  styleUrls: ['./kanban-board-item.component.scss']
})
export class KanbanBoardItemComponent implements OnInit {
  @Input() issue!: IssueInterface;
  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      issue: this.issue,
    };
    this.dialog.open(KanbanBoardItemDialogComponent, dialogConfig);
  }

}
