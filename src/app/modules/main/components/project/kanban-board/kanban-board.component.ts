import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IssuesService } from '../../../services/issues.service';
import { IssueInterface } from '../../../domain/issue-interface';
import { KanbanColumnInterfaceImpl } from '../../../domain/kanban-column-interface-impl';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  @Input() projectName = '';
  @Input() public board!: {
    columns: KanbanColumnInterfaceImpl[];
  };

  constructor(private issuesService: IssuesService, private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const request = {
        issueNumber: event.item.data.issueNumber,
        status: event.container.element.nativeElement.id,
      };

      this.board.columns
        .filter((column) => column.name.toUpperCase() == event.container.element.nativeElement.id.toUpperCase())[0]
        .issues.filter((issue) => issue.issueNumber == event.item.data.issueNumber)[0].status =
        event.container.element.nativeElement.id;

      this.issuesService.updateIssue(request).subscribe(
        (response) => {
          this.notifierService.notify('success', 'Successfully moved');
        },
        (error) => {
          this.notifierService.notify('error', error.error.message);
        }
      );
    }
  }

  loadIssues() {
    this.issuesService.getIssuesByProjectName(this.projectName).subscribe((response) => {
      response.forEach((issue: IssueInterface) => {
        this.board.columns
          .filter((column) => column.name.toLocaleUpperCase() == issue.status.toUpperCase())[0]
          .issues.push(issue);
      });
    });
  }
}
