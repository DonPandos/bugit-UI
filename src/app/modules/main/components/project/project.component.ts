import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../workspace/create-project-dialog/create-project-dialog.component';
import { CreateIssueDialogComponent } from './create-issue-dialog/create-issue-dialog.component';
import { ProjectSettingDialogComponent } from './project-setting-dialog/project-setting-dialog.component';
import { KanbanColumnInterfaceImpl } from '../../domain/kanban-column-interface-impl';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public projectName = '';
  public board = {
    columns: [
      new KanbanColumnInterfaceImpl('TODO'),
      new KanbanColumnInterfaceImpl('Blocked'),
      new KanbanColumnInterfaceImpl('In progress'),
      new KanbanColumnInterfaceImpl('Ready to Test'),
      new KanbanColumnInterfaceImpl('In product test'),
      new KanbanColumnInterfaceImpl('Done'),
    ],
  };

  constructor(public authService: AuthService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProjectNameFromPath();
  }

  getProjectNameFromPath() {
    this.route.params.subscribe((params) => {
      this.projectName = params['projectName'];
    });
  }

  openCreateIssueDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      projectName: this.projectName,
    };
    this.dialog.open(CreateIssueDialogComponent, dialogConfig)
      .componentInstance
      .success
      .subscribe((result) => {
        this.board.columns.filter(
          column => column.name.toLocaleUpperCase() == result.status.toUpperCase()
        )[0].issues.push(result);
    });

  }

  openProjectSettingDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      projectName: this.projectName,
    };
    this.dialog.open(ProjectSettingDialogComponent, dialogConfig);
  }
}
