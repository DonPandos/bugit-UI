import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {IssueInterface} from "../../../../../domain/issue-interface";
import {NotifierService} from "angular-notifier";
import {CommentsService} from "../../../../../services/comments.service";
import {LogTimeDialogComponent} from "./log-time-dialog/log-time-dialog.component";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectsService} from "../../../../../services/projects.service";
import {IssuesService} from "../../../../../services/issues.service";

@Component({
  selector: 'app-kanban-board-item-dialog',
  templateUrl: './kanban-board-item-dialog.component.html',
  styleUrls: ['./kanban-board-item-dialog.component.scss']
})
export class KanbanBoardItemDialogComponent implements OnInit {

  issue: IssueInterface;
  comments: any;
  members: any;

  constructor(
    private commentsService: CommentsService,
    private projectsService: ProjectsService,
    private issuesService: IssuesService,
    private dialogRef: MatDialogRef<KanbanBoardItemDialogComponent>,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.issue = data.issue;
  }

  ngOnInit(): void {
    this.loadComments();
    this.loadMembers();
  }

  private loadComments() {
    this.commentsService.getComments(this.issue.issueNumber)
      .subscribe(response => {
        this.comments = response;
      });
  }

  private loadMembers() {
    this.projectsService.getMembers(this.getProjectByIssue(this.issue.issueNumber))
      .subscribe(response => {
        this.members = response.members;
      })
  }

  close() {
    this.dialogRef.close();
  }

  changeAssignee(assignee: any) {
    const request = {
      issueNumber: this.issue.issueNumber,
      assigneeUsername: assignee.value
    }

    this.issuesService.updateIssue(request)
      .subscribe(response => {
        this.notifierService.notify('success', 'Assignee has been successfully changed');
      }, error => {
        this.notifierService.notify('error', error.error.message);
      })
  }

  showLogTimeDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      issue: this.issue,
    };
    this.dialog.open(LogTimeDialogComponent, dialogConfig)
      .componentInstance
      .logTimeSuccess
      .subscribe((result) => {
        this.issue.timeRemaining = result.timeRemaining;
        this.issue.loggedTime = result.issueLoggedTime;
      });
  }

  parseInterval(interval:any) {
    interval = interval.replace('PT', '');
    interval = interval.replace('H', ' hours ');
    interval = interval.replace('M', ' minutes');
    if (interval == '0S') interval = 'No time';
    return interval;
  }

  addComment(comment: any) {
    const request = {
      text: comment.value,
      issueNumber: this.issue.issueNumber
    }

    this.commentsService.addComment(request)
      .subscribe(response => {
        this.notifierService.notify('success', response.responseInformation.message);
        this.comments.push(response);
        comment.value = '';
      })
  }

  getProjectByIssue(issueNumber:string): string {
    return issueNumber.substr(0, issueNumber.lastIndexOf('-'));
  }
}
