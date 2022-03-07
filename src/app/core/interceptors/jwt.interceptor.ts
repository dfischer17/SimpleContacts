import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
