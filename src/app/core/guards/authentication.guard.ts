import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private alertCtrl: AlertController) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRole = route.data?.role;

    // User is logged in
    if (sessionStorage.getItem('currentUser')) {

      // Check if user posses required role to access route
      const currentUserRole = JSON.parse(sessionStorage.getItem('currentUser')).role;
      if (!requiredRole || requiredRole === currentUserRole) {
        return true;
      }
    }

    // If no user is logged in or lacks role return to login-page
    this.showNotAuthorizedAlert().then(_ => this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }));
    return false;
  }

  async showNotAuthorizedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nicht Autorisiert',
      message: 'Sie sind nicht berechtigt diese Seite aufzurufen!',
      buttons: ['OK']
    });
    alert.present();
  }
}
