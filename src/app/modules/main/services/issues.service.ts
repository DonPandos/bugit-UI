import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IssueInterface} from "../domain/issue-interface";

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  public getIssuesByProjectName(projectName: string): Observable<any> {
    return this.http.get(`/api/v1/issues/project/${projectName}`);
  }

  public createIssue(request: any): Observable<any> {
    return this.http.post('/api/v1/issues', request);
  }

  public updateIssue(request: any): Observable<any> {
    return this.http.post('/api/v1/issues/update', request);
  }

  public logTime(request: any): Observable<any> {
    return this.http.post(`api/v1/issues/logtime`, request);
  }
}
