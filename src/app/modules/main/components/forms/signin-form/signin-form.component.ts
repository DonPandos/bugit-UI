import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../../../services/auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  form = new FormGroup({});
  model = {
    username: '',
    password: '',
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
      ],
    },
  ];

  constructor(public authService: AuthService, private notifierService: NotifierService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.model).subscribe(
      (response) => {
        localStorage.setItem('bugit-token', response.token);
        this.notifierService.notify('success', 'Successfully logged in');
        this.router.navigate(['/workspace']);
      },
      (error) => {
        this.notifierService.notify('error', error.error.message);
      }
    );
  }
}
