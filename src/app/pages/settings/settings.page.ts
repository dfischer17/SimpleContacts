import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  prefersDark: boolean;
  selectedAccentColor: string;

  constructor(private usrPreferences: UserPreferencesService) {}

  ngOnInit() {
    this.initDarkModeToggle();
    this.usrPreferences.initPreferences();
  }

  /*
  Callback für dark-mode ion-toggle
  */
  toggleDarkMode() {
    this.usrPreferences.enableDarkMode(this.prefersDark);
    sessionStorage.setItem('prefersDarkMode', this.prefersDark === true ? 'true' : 'false');
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

    this.usrPreferences.changeAccentColor(newAccentColor);
  }

  /*
  Synchronisiert den Zustand des DarkMode ion-toggle (ein/aus) mit den Systemeinstellungen und
  innerhalb der Anwendung
  */
  private initDarkModeToggle() {
    this.prefersDark = sessionStorage.getItem('prefersDarkMode') === 'true' ? true : false;
  }
}
