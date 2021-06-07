import { EventEmitter, Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss'],
})
export class WorkspaceDashboardComponent implements OnInit {
  @Input() projects: any;
  @Output() onItemClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick(project: any) {
    this.onItemClick.emit(project)
  }
}
