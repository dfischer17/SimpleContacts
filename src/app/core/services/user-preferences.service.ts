import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private authService: AuthenticationService) { }

  initPreferences() {
    this.initAccentColor();
    this.initTheme();
  }

  private async initAccentColor() {
    // Load default user-theme
    if (this.authService.getCurrentUser() !== null) {
      if (sessionStorage.getItem('preferedAccentColor') === null) {
        console.log('No custom accent-color');

        sessionStorage.setItem('preferedAccentColor', this.authService.getCurrentUser().preferedAccentColor);

        const preferedAccentColor = sessionStorage.getItem('preferedAccentColor');
        document.body.style.setProperty('--accentColor', preferedAccentColor);
        document.body.style.setProperty('--toggleHead', '#ffffff'); // Necassery to style ion-toggle correctly
        console.log(`Detected prefered accent-color: ${preferedAccentColor}`);
      }

      // Load manually changed theme
      else {
        console.log('Custom accent-color detected');
        const preferedAccentColor = sessionStorage.getItem('preferedAccentColor');
        document.body.style.setProperty('--accentColor', preferedAccentColor);
        document.body.style.setProperty('--toggleHead', '#ffffff'); // Necassery to style ion-toggle correctly
        console.log(`Detected prefered accent-color: ${preferedAccentColor}`);
      }
    }

    else {
      document.body.style.setProperty('--accentColor', '#3880ff');
      document.body.style.setProperty('--toggleHead', '#ffffff'); // Necassery to style ion-toggle correctly
      console.log('No prefered accent-color detected proceeding with default');
    }
  }

  private initTheme() {
    // Load default user-theme
    if (this.authService.getCurrentUser() !== null) {
      if (sessionStorage.getItem('prefersDarkMode') === null) {
        console.log('No custom theme');

        sessionStorage.setItem('prefersDarkMode', this.authService.getCurrentUser().prefersDarkMode);

        const prefersDark = sessionStorage.getItem('prefersDarkMode') === 'true' ? true : false;
        this.enableDarkMode(prefersDark);
      }

      // Load manually changed theme
      else {
        console.log('Custom theme detected');
        const prefersDark = sessionStorage.getItem('prefersDarkMode') === 'true' ? true : false;
        this.enableDarkMode(prefersDark);
      }
    }
  }

  /*
  Schaltet Dark-Mode ein/aus
  */
  enableDarkMode(dark: boolean) {
    if (dark) {
      document.body.classList.add('dark');
    }
    else {
      document.body.classList.remove('dark');
    }
  }

  changeAccentColor(color: string) {
    document.body.style.setProperty('--accentColor', color);
    document.body.style.setProperty('--toggleHead', '#ffffff'); // Necassery to style ion-toggle correctly
    sessionStorage.setItem('preferedAccentColor', color);
  }
}
