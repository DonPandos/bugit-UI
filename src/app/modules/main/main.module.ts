import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from './components/forms/signin-form/signin-form.component';
import { SignupFormComponent } from './components/forms/signup-form/signup-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from './components/utils/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { WorkspaceDashboardComponent } from './components/workspace/workspace-dashboard/workspace-dashboard.component';
import { WorkspaceDashboardItemComponent } from './components/workspace/workspace-dashboard/workspace-dashboard-item/workspace-dashboard-item.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './interceptors/addheader.interceptor';
import { ProjectComponent } from './components/project/project.component';
import { CreateProjectDialogComponent } from './components/workspace/create-project-dialog/create-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { KanbanBoardComponent } from './components/project/kanban-board/kanban-board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { KanbanBoardItemComponent } from './components/project/kanban-board/kanban-board-item/kanban-board-item.component';
import { CreateIssueDialogComponent } from './components/project/create-issue-dialog/create-issue-dialog.component';
import { ProjectSettingDialogComponent } from './components/project/project-setting-dialog/project-setting-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { KanbanBoardItemDialogComponent } from './components/project/kanban-board/kanban-board-item/kanban-board-item-dialog/kanban-board-item-dialog.component';
import { LogTimeDialogComponent } from './components/project/kanban-board/kanban-board-item/kanban-board-item-dialog/log-time-dialog/log-time-dialog.component';

@NgModule({
  declarations: [
    SigninFormComponent,
    SignupFormComponent,
    MainPageComponent,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    WorkspaceComponent,
    WorkspaceDashboardComponent,
    WorkspaceDashboardItemComponent,
    ProjectComponent,
    CreateProjectDialogComponent,
    KanbanBoardComponent,
    KanbanBoardItemComponent,
    CreateIssueDialogComponent,
    ProjectSettingDialogComponent,
    KanbanBoardItemDialogComponent,
    LogTimeDialogComponent,
  ],
  exports: [MainComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    ScrollingModule,
    DragDropModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
