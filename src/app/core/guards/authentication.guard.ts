import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private alertCtrl: AlertController, private authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRole = route.data?.role;

    // User is logged in
    if (sessionStorage.getItem('currentUser')) {

      // Check if user posses required role to access route
      const currentUserRole = this.authService.getCurrentUser().role;
      if (!requiredRole || requiredRole === currentUserRole) {
        return true;
      }
    }

    // If no user is logged in or lacks role return to login-page
    this.showNotAuthorizedAlert().then(_ => this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }));
    return false;
  }

  private async showNotAuthorizedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nicht Autorisiert',
      message: 'Sie sind nicht berechtigt diese Seite aufzurufen!',
      buttons: ['OK']
    });
    alert.present();
  }
}
