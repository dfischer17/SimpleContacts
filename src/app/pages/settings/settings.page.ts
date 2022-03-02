import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';


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
    this.usrPreferences.addPrefersColorSchemeListener();
    this.usrPreferences.initAccentColor();
    this.usrPreferences.initTheme();
  }

  /*
  Callback für dark-mode ion-toggle
  */
  toggleDarkMode() {
    this.usrPreferences.enableDarkMode(this.isDark);
    sessionStorage.setItem('prefersDarkMode', this.isDark === true ? 'true' : 'false');
  }

  /*
  Synchronisiert den Zustand des DarkMode ion-toggle (ein/aus) mit den Systemeinstellungen und
  innerhalb der Anwendung
  */
  initDarkModeToggle() {
    this.isDark = sessionStorage.getItem('prefersDarkMode') === 'true' ? true : false;
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
