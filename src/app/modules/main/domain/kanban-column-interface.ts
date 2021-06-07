import {IssueInterface} from "./issue-interface";

export interface KanbanColumnInterface {
  name: string;
  issues: IssueInterface[];
}
