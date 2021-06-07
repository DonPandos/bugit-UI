import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  public getProjects(): Observable<any> {
    return this.http.get('/api/v1/projects');
  }

  public createProject(request: any): Observable<any> {
    return this.http.post('/api/v1/projects/create', request);
  }

  public addMember(projectName: string, username: string) {
    return this.http.get(`/api/v1/projects/${projectName}/addmember/${username}`);
  }

  public getMembers(projectName: string):Observable<any> {
    return this.http.get(`/api/v1/projects/members/projectName/${projectName}`);
  }

  public loadMembersWithRoles(projectName: string):Observable<any> {
    return this.http.get(`/api/v1/projects/membersWithRoles/projectName/${projectName}`);
  }

  public changeMemberRoles(request: any):Observable<any> {
    return this.http.post('/api/v1/projects/roles', request);
  }
}
