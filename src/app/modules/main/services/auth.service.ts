import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(request: any): Observable<any> {
    return this.http.post('api/v1/auth/register', request);
  }

  public login(request: any): Observable<any> {
    return this.http.post('api/v1/auth/login', request);
  }

  public getToken(): string {
    return localStorage.getItem('bugit-token') as string;
  }

  public isAuthorized(): boolean {
    let token: any = localStorage.getItem('bugit-token');
    if (typeof token === 'string') {
      const tokenInfo: any = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;

      return tokenInfo?.exp > currentTime;
    }
    return false;
  }

  public getUsername(): string {
    let token: any = localStorage.getItem('bugit-token');
    if (typeof token === 'string') {
      const tokenInfo: any = jwtDecode(token);

      return tokenInfo.sub;
    }
    return '';
  }

  public hasProjectRole(projectName: string, permission: string): boolean {
    let token: any = localStorage.getItem('bugit-token');
    if (typeof token === 'string') {
      const tokenInfo: any = jwtDecode(token);
      const roleName = `ROLE_${permission.toLocaleUpperCase()}_${projectName.toLocaleUpperCase()}`;
      return tokenInfo.ROLES.filter((role: any) => role.authority == roleName).length > 0;
    }
    return false;
  }

  public logout() {
    localStorage.removeItem('bugit-token');
  }
}
