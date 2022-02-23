import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'user-token';

export interface User {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.loadUser();
  }

  loadUser() {
    Storage.get({ key: TOKEN_KEY }).then(res => {
      if (res.value) {
        this.currentUser.next(JSON.parse(res.value));
      }
      else {
        this.currentUser.next(false);
      }
    });
  }

  login(username: string, password: string) {
    let userObj: User;

    if (username === 'user' && password === 'user') {
      userObj = {
        name: 'Daniel Fischer',
        role: 'USER',
      };
    }
    else if (username === 'admin' && password === 'admin') {
      userObj = {
        name: 'Gerhard Wührer',
        role: 'ADMIN',
      };
    }

    return of(userObj).pipe(
      tap(user => {
        Storage.set({ key: TOKEN_KEY, value: JSON.stringify(user) });
        this.currentUser.next(user);
      })
    );
  }

  getUser() {
    return this.currentUser.asObservable();
  }

  getUserSync() {
    return this.currentUser.value;
  }

  async logout() {
    await Storage.remove({ key: TOKEN_KEY });
    this.currentUser.next(false);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  hasRole(role: string): boolean {
    if (!this.currentUser.value || !(this.currentUser.value.role === role)) {
      return false;
    }

    return true;
  }
}
