import {KanbanColumnInterface} from "./kanban-column-interface";
import {IssueInterface} from "./issue-interface";

export class KanbanColumnInterfaceImpl implements KanbanColumnInterface{
  issues: IssueInterface[];
  name: string;

  constructor(name: string) {
    this.name = name;
    this.issues = [];
  }
}
