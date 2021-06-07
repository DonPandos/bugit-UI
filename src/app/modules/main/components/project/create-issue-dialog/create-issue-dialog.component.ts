import {Component, Inject, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {ProjectsService} from "../../../services/projects.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {IssuesService} from "../../../services/issues.service";

@Component({
  selector: 'app-create-issue-dialog',
  templateUrl: './create-issue-dialog.component.html',
  styleUrls: ['./create-issue-dialog.component.scss']
})
export class CreateIssueDialogComponent implements OnInit {
  @Output() success = new EventEmitter();
  form = new FormGroup({});
  model = {
    name: '',
    description: '',
    status: '',
    priority: '',
    estimatedHours: '',
    estimatedMinutes: '',
    assignee: {}
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Issue name',
            placeholder: 'Enter issue name',
            required: true,
          },
          validators: {
            name: {
              expression: (c: any) => /^.{2,}$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid issue name. Minimum length: 2`,
            },
          },
        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: 'Issue description',
            placeholder: 'Enter issue description',
            rows: 10
          },
        },
        {
          key: 'status',
          type: 'select',
          templateOptions: {
            label: 'Issue status',
            required: true,
            options: [
              {name:'Todo'},
              {name:'Blocked'},
              {name:'In progress'},
              {name:'Ready to test'},
              {name:'In product test'},
              {name:'Done'}
            ],
            labelProp: 'name',
            valueProp: 'name'
          }
        },
        {
          key: 'priority',
          type: 'select',
          templateOptions: {
            label: 'Issue issue priority',
            required: true,
            options: [
              {name:'Low'},
              {name:'Medium'},
              {name:'High'},
              {name:'Highest'}
            ],
            labelProp: 'name',
            valueProp: 'name'
          },
          validators: {
            // description: {
            //   expression: (c: any) => /^.{6,}$/.test(c.value),
            //   message: (error: any, field: FormlyFieldConfig) =>
            //     `"${field.formControl?.value}" is not a valid password. Minimum length: 6`,
            // },
          },
        },
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
        {
          key: 'assignee',
          type: 'select',
          templateOptions: {
            label: 'Assignee',
            options: [],
            labelProp: (assignee:any) => {
              return `${assignee.firstName} ${assignee.lastName}(${assignee.username})`;
            },
            valueProp: 'username',
            required: true,
          },
          hooks: {
            onInit: field => {
              this.projectsService.getMembers(this.data.projectName)
                .subscribe(response => {
                  if (field?.templateOptions !== undefined) {
                    field.templateOptions.options = response.members;
                  }
                });
            }
          }
        },
      ],
    },
  ];
  constructor(
    private projectsService: ProjectsService,
    private issuesService: IssuesService,
    private dialogRef: MatDialogRef<CreateIssueDialogComponent>,
    private notifierService: NotifierService,
    @Inject(MAT_DIALOG_DATA) public data: any
) { }

  ngOnInit(): void {
    console.log(this.data.projectName);
  }

  onSubmit() {
    if (!this.form.invalid) {
      const time: number = (Number(this.model.estimatedHours) * 3600) + (Number(this.model.estimatedMinutes) * 60);

      const request = {
        status: this.model.status,
        name: this.model.name,
        description: this.model.description,
        originalEstimate: time,
        timeRemaining: time,
        priority: this.model.priority,
        projectName: this.data.projectName,
        assigneeUsername: this.model.assignee
      }

      this.issuesService.createIssue(request)
        .subscribe(response => {
          this.notifierService.notify('success', response.responseInformation.message);
          this.success.emit(response);
          this.dialogRef.close();
        }, error => {
          this.notifierService.notify('error', error.error.message);
        })
    }
  }

  close() {
    this.dialogRef.close();
  }

}
