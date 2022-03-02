import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor() { }

  async initAccentColor() {
    // Load prefered accent-color from storage
    const { value } = await Storage.get({ key: 'preferedAccentColor' });

    // If no prefered accent-color is set use default
    if (value === null) {
      document.body.style.setProperty('--accentColor', '#3880ff');
      document.body.style.setProperty('--toggleHead', '#ffffff'); // Necassery to style ion-toggle correctly
      console.log('No prefered accent-color detected proceeding with default');
    }
    else {
      // Apply prefered accent-color
      document.body.style.setProperty('--accentColor', value);
      document.body.style.setProperty('--toggleHead', '#ffffff'); // Necassery to style ion-toggle correctly
      console.log(`Detected prefered accent-color: ${value}`);
    }
  }

  initTheme() {
    // Load prefered theme from storage
    if (sessionStorage.getItem('prefersDarkMode') === null) {
      sessionStorage.setItem('prefersDarkMode', JSON.parse(sessionStorage.getItem('currentUser')).prefersDarkMode);
      console.log('No custom theme');
      const prefersDark = sessionStorage.getItem('prefersDarkMode') === 'true' ? true : false;
      this.enableDarkMode(prefersDark);
    }
    else {
      const prefersDark = sessionStorage.getItem('prefersDarkMode') === 'true' ? true : false;
      this.enableDarkMode(prefersDark);
      console.log('Custom theme detected');
    }
  }

  /*
  Reagiert auf Themeaenderung im System
  */
  addPrefersColorSchemeListener() {
    // const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    // const setColorScheme = e => {
    //   if (e.matches) {
    //     // Dark
    //     console.log('Detected Dark');
    //     this.enableDarkMode(true);
    //   } else {
    //     // Light
    //     console.log('Detected Light');
    //     this.enableDarkMode(false);
    //   }
    // };

    // setColorScheme(colorSchemeQueryList);
    // colorSchemeQueryList.addListener(setColorScheme);
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
}
