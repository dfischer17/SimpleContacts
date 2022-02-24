import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data?.role;

    return this.authService.getUser().pipe(
      filter(val => val !== null),
      take(1),
      map(user => {
        if (!user) {
          return this.router.parseUrl('/');
        }
        else {
          const role = user.role;

          if (!expectedRole || expectedRole === role) {
            return true;
          }
          else {
            this.router.navigateByUrl('login');
            alert('Access denied');
            return false;
          }
        }
      })
    );
  }
}
