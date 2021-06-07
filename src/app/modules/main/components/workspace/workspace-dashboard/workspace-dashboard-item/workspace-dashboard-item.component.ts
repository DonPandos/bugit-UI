import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-workspace-dashboard-item',
  templateUrl: './workspace-dashboard-item.component.html',
  styleUrls: ['./workspace-dashboard-item.component.scss'],
})
export class WorkspaceDashboardItemComponent implements OnInit {
  @Input() project: any;
  @Output() onItemClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onItemClick.emit(this.project);
  }
}
