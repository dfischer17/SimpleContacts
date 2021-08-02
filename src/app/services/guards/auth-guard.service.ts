import { Inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  // Login data for access
  private usrName = "Finn";
  private pwd = "asdf"
  private authenticated: boolean;

  constructor(private router: Router,) { }

  canActivate(): boolean {
    if (!this.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  /*
  Checks Username and password and enables canActivate if correct
  */
  authenticate(userName: string, password: string) {
    if (userName === this.usrName && password === this.pwd) {
      this.authenticated = true;
    }
    else {
      this.authenticated = false;
    }
  }

  /*
  Logout the user
  */
  logout() {
    this.authenticated = false;
  }
}
