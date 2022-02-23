import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private router: Router) { }

  async canActivate() {
    const hasSeenIntro = await Storage.get({ key: INTRO_KEY });

    if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    }
    else {
      this.router.navigateByUrl('intro', { replaceUrl: true });
      return true;
    }
  }
}
