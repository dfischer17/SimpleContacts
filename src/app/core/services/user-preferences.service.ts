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
}
