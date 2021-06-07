import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ProjectsService} from "../../../services/projects.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-project-setting-dialog',
  templateUrl: './project-setting-dialog.component.html',
  styleUrls: ['./project-setting-dialog.component.scss']
})
export class ProjectSettingDialogComponent implements OnInit {
  form = new FormGroup({});
  model = {
    username: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'username',
          type: 'input',
          templateOptions: {
            label: 'Username',
            placeholder: 'Enter username to add',
            required: true,
          },
          validators: {
            login: {
              expression: (c: any) => /^.{4,}$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid username. Minimum length: 4`,
            },
          },
        }
      ],
    },
  ];

  users: any;
  constructor(
    private projectsService: ProjectsService,
    private dialogRef: MatDialogRef<ProjectSettingDialogComponent>,
    private notifierService: NotifierService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadMembersWithRoles();
  }

  onAddMemberSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.projectsService.addMember(this.data.projectName, this.model.username)
      .subscribe((response:any) => {
        this.notifierService.notify('success', `${this.model.username} successfully added`);
        this.users.push({
          username: response.username,
          email: response.email,
          firstname: response.firstName,
          lastname: response.lastName,
          roles: response.roles
        })
      }, error => {
        this.notifierService.notify('error', error.error.message);
      })

  }

  close() {
    this.dialogRef.close();
  }

  loadMembersWithRoles() {
    this.projectsService.loadMembersWithRoles(this.data.projectName)
      .subscribe(response => {
        this.users = response;
      })
  }

  hasRole(user:any, role:string) {
    return user.roles.filter((userRole:any) => userRole == role).length > 0;
  }

  changeUserRoles(user:any, role:string, isChecked:boolean) {
    isChecked ?
      user.roles.push(role)
      :
      user.roles = user.roles.filter((userRole:string) => userRole !== role);

    const request = {
      userName: user.username,
      projectName: this.data.projectName,
      roleKeyList: user.roles
    }

    this.projectsService.changeMemberRoles(request)
      .subscribe(response => {
        this.notifierService.notify('success', response.responseInformation.message);
      },)
  }
}
