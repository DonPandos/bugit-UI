import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/main/components/main-page/main-page.component';
import { SignupFormComponent } from './modules/main/components/forms/signup-form/signup-form.component';
import { SigninFormComponent } from './modules/main/components/forms/signin-form/signin-form.component';
import { WorkspaceComponent } from './modules/main/components/workspace/workspace.component';
import { AuthGuard } from './modules/main/services/auth.guard';
import {ProjectComponent} from "./modules/main/components/project/project.component";
import {ProjectAuthGuard} from "./modules/main/services/project-auth.guard";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'signin', component: SigninFormComponent },
  { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard] },
  { path: 'project/:projectName', component: ProjectComponent, canActivate: [ProjectAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
