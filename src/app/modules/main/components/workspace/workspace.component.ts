import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private dialog: MatDialog,
    private router: Router) {}

  projects: any;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  onItemClick(project:any) {
    this.router.navigate([`project/${project.name}`]);
  }

  openCreateProjectModalWindow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateProjectDialogComponent, dialogConfig)
      .componentInstance
      .success
      .subscribe((result) => {
        this.projects.push({name: result.name, description: result.description});
      });
  }
}
