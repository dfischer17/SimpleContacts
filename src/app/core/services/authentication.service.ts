import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationDto } from 'src/app/models/authentication-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private urlBase = 'https://localhost:5001/api/Authentication';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<AuthenticationDto> {
    console.log(`AuthenticationService::login ${username}`);
    const url = `${this.urlBase}/authenticate`;
    // eslint-disable-next-line object-shorthand
    return this.httpClient.post<AuthenticationDto>(url, { name: username, password: password })
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
    sessionStorage.removeItem('prefersDarkMode');
    sessionStorage.removeItem('preferedAccentColor');
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
}
