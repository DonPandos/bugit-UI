import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import {NotifierService} from "angular-notifier";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  form = new FormGroup({});
  model = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'username',
          type: 'input',
          templateOptions: {
            label: 'Login',
            placeholder: 'Enter login',
            required: true,
          },
          validators: {
            login: {
              expression: (c: any) => /^.{4,}$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid login. Minimum length: 4`,
            },
          },
        },
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            label: 'Password',
            placeholder: 'Enter password',
            required: true,
          },
          validators: {
            password: {
              expression: (c: any) => /^.{6,}$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid password. Minimum length: 6`,
            },
          },
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            label: 'Email address',
            placeholder: 'Enter email address',
            required: true,
          },
          validators: {
            lastname: {
              expression: (c: any) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid email address`,
            },
          },
        },
        {
          key: 'firstName',
          type: 'input',
          templateOptions: {
            label: 'First name',
            placeholder: 'Enter first name',
            required: true,
          },
          validators: {
            firstname: {
              expression: (c: any) => /^[A-Za-z]+$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid first name`,
            },
          },
        },
        {
          key: 'lastName',
          type: 'input',
          templateOptions: {
            label: 'Last name',
            placeholder: 'Enter last name',
            required: true,
          },
          validators: {
            lastname: {
              expression: (c: any) => /^[A-Za-z]+$/.test(c.value),
              message: (error: any, field: FormlyFieldConfig) =>
                `"${field.formControl?.value}" is not a valid last name`,
            },
          },
        },
      ],
    },
  ];

  constructor(
    public authService: AuthService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.register(this.model).subscribe(
      (data) => {
        this.notifierService.notify('success', 'Acount has been created successfully');
        this.router.navigate(['/signin']);
      },
      (error) => {
        this.notifierService.notify('error', error.error.message);
      }
    );
  }
}
