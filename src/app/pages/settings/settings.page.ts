import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { UserPreferencesService } from '../../core/services/user-preferences.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isDark: boolean;
  selectedAccentColor: string;

  constructor(private usrPreferences: UserPreferencesService) {}

  ngOnInit() {
    this.initDarkModeToggle();
    this.usrPreferences.initAccentColor();
  }

  /*
  Callback für dark-mode ion-toggle
  */
  toggleDarkMode() {
    this.enableDarkMode(this.isDark);
  }

  /*
  Schaltet Dark-Mode ein/aus
  */
  enableDarkMode(dark: boolean) {
    if (dark) {
      console.log('Enabled dark-mode');
      document.body.classList.add('dark');
    }
    else {
      console.log('Disabled dark-mode');
      document.body.classList.remove('dark');
    }

    this.isDark = document.body.classList.contains('dark');
  }

  /*
  Synchronisiert den Zustand des DarkMode ion-toggle (ein/aus) mit den Systemeinstellungen und
  innerhalb der Anwendung
  */
  initDarkModeToggle() {
    console.log('Init dark-mode toggle ', document.body.classList.contains('dark'));
    this.isDark = document.body.classList.contains('dark');
  }

  /*
  Callback für das ChangeAccentColor-select.
  Ändert die bevorzugte Akzentfarbe und speichert sie Lokal
  */
  changeAccentColor() {
    const newAccentColor = this.selectedAccentColor;

    console.log('Accent-color changed to: ', newAccentColor);
    document.body.style.setProperty('--accentColor', newAccentColor);
    document.body.style.setProperty('--toggleHead', '#ffffff');

    Storage.set({
      key: 'preferedAccentColor',
      value: newAccentColor,
    });
  }
}
