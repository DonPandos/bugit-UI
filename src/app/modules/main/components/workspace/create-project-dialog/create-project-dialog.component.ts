import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../services/projects.service';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
})
export class CreateProjectDialogComponent implements OnInit {
  form = new FormGroup({});
  model = {
    name: '',
    description: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Project name',
            placeholder: 'Enter project name',
            required: true,
          },
          validators: {
            name: {
              expression: (c: any) => /^.{2,}$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid project name. Minimum length: 2`,
            },
          },
        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description',
            required: false,
            rows: 10,
          },
          // validators: {
          //   description: {
          //     // expression: (c: any) => /^.{6,}$/.test(c.value),
          //     // message: (error: any, field: FormlyFieldConfig) =>
          //     //   `"${field.formControl?.value}" is not a valid password. Minimum length: 6`,
          //   },
          // },
        },
      ],
    },
  ];

  @Output() success = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private projectsService: ProjectsService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.form.invalid) {
      this.projectsService.createProject(this.model).subscribe(
        (response) => {
          this.notifierService.notify('success', response.responseInformation.message);
          this.success.emit(response);
          this.dialogRef.close();
        },
        (error) => {
          this.notifierService.notify('error', error.error.message);
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
