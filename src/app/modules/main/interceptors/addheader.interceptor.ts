import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token !== null) {
      const clonedRequest = request.clone({
        headers: request.headers.append('Authorization', this.authService.getToken()),
      });

      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
