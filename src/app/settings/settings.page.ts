import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isDark: boolean;
  selectedAccentColor: string;

  constructor() {}

  ngOnInit() {
    this.initDarkModeToggle();

    //Accent colors
    const blue = '#3880ff';
    const red = '#eb4034';
    const green = '#2dd36f'
    const purple = '#cc00ff';
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
  Callback für das ChangeAccentColor-select
  */
  changeAccentColor() {
    console.log('Accent-color changed to: ', this.selectedAccentColor);
    document.body.style.setProperty('--accentColor', this.selectedAccentColor);
    document.body.style.setProperty('--toggleHead', '#ffffff');
  }
}
