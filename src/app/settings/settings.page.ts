import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isDark: boolean;

  constructor() {}

  ngOnInit() {
    this.initDarkModeToggle();
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
}
