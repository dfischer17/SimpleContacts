import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationDto } from 'src/app/models/authentication-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private urlBase = 'http://localhost:5000/authentication';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<AuthenticationDto> {
    console.log(`AuthenticationService::login ${username}`);
    const url = `${this.urlBase}/authenticate`;
    return this.httpClient.post<AuthenticationDto>(url, { username, password })
      .pipe(
        tap(user => {
          if (user && user.token) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
        })
      );
  }

  logout() {
    console.log('AuthenticationService::logout');
    sessionStorage.removeItem('currentUser');
  }
}
