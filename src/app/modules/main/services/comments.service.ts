import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  public getComments(issueNumber: string):Observable<any> {
    return this.http.get(`api/v1/comments/issueNumber/${issueNumber}`);
  }

  public addComment(request:any):Observable<any> {
    return this.http.post(`api/v1/comments`, request);
  }
}
