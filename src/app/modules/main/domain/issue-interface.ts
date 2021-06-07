import {UserInterface} from "./user-interface";

export interface IssueInterface {
  issueNumber: string;
  status: string;
  name: string;
  description: string;
  originalEstimate: string;
  timeRemaining: string;
  loggedTime: string,
  priority: string;
  projectName: string;
  assignee: UserInterface;
  reporter: UserInterface;
}
