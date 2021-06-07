import {Component, Inject, EventEmitter, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KanbanBoardItemDialogComponent} from "../kanban-board-item-dialog.component";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {IssuesService} from "../../../../../../services/issues.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-log-time-dialog',
  templateUrl: './log-time-dialog.component.html',
  styleUrls: ['./log-time-dialog.component.scss']
})
export class LogTimeDialogComponent implements OnInit {
  form = new FormGroup({});
  model = {
    estimatedHours: '',
    estimatedMinutes: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'estimatedHours',
          type: 'select',
          templateOptions: {
            label: 'Hours',
            required: true,
            options: [
              {name:'0'},
              {name:'1'},
              {name:'2'},
              {name:'3'},
              {name:'4'},
              {name:'5'},
              {name:'6'},
              {name:'7'},
              {name:'8'},
              {name:'9'},
              {name:'10'},
              {name:'11'},
              {name:'12'},
              {name:'13'},
              {name:'14'},
              {name:'15'},
              {name:'16'},
              {name:'17'},
              {name:'18'},
              {name:'19'},
              {name:'20'},
              {name:'21'},
              {name:'22'},
              {name:'23'},
              {name:'24'},
            ],
            labelProp: 'name',
            valueProp: 'name'
          },
        },
        {
          key: 'estimatedMinutes',
          type: 'select',
          templateOptions: {
            label: 'Minutes',
            required: true,
            options: [
              {name:'0'},
              {name:'1'},
              {name:'2'},
              {name:'3'},
              {name:'4'},
              {name:'5'},
              {name:'6'},
              {name:'7'},
              {name:'8'},
              {name:'9'},
              {name:'10'},
              {name:'11'},
              {name:'12'},
              {name:'13'},
              {name:'14'},
              {name:'15'},
              {name:'16'},
              {name:'17'},
              {name:'18'},
              {name:'19'},
              {name:'20'},
              {name:'21'},
              {name:'22'},
              {name:'23'},
              {name:'24'},
              {name:'25'},
              {name:'26'},
              {name:'27'},
              {name:'28'},
              {name:'29'},
              {name:'30'},
              {name:'31'},
              {name:'32'},
              {name:'33'},
              {name:'34'},
              {name:'35'},
              {name:'36'},
              {name:'37'},
              {name:'38'},
              {name:'39'},
              {name:'40'},
              {name:'41'},
              {name:'42'},
              {name:'43'},
              {name:'44'},
              {name:'45'},
              {name:'46'},
              {name:'47'},
              {name:'48'},
              {name:'49'},
              {name:'50'},
              {name:'51'},
              {name:'52'},
              {name:'53'},
              {name:'54'},
              {name:'55'},
              {name:'56'},
              {name:'57'},
              {name:'58'},
              {name:'59'},
            ],
            labelProp: 'name',
            valueProp: 'name'
          },
        },

      ],
    },
  ];
  @Output() logTimeSuccess = new EventEmitter();
  constructor(
    private dialogRef: MatDialogRef<KanbanBoardItemDialogComponent>,
    private notifierService: NotifierService,
    private issuesService: IssuesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const time = (Number(this.model.estimatedHours) * 3600) + (Number(this.model.estimatedMinutes) * 60);
    const request = {
      issueNumber: this.data.issue.issueNumber,
      timeInSeconds: time
    }
    this.issuesService.logTime(request)
      .subscribe(response => {
        this.notifierService.notify('success', response.responseInformation.message);
        this.logTimeSuccess.emit(response);
        this.dialogRef.close();
      })
  }

  close() {
    this.dialogRef.close();
  }

}
