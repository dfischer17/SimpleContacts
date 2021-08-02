import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthGuardService } from '../services/guards/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter, ViewWillLeave{
  usrName: string;
  pwd: string;
  private deferredPrompt;

  constructor(private router: Router, private authGuardService: AuthGuardService) {
    // Initialize deferredPrompt for use later to show browser install prompt.
    window.addEventListener('beforeinstallprompt', (e) => {
      // Standard installieren Message abfangen
      e.preventDefault();

      // Installieren event speichern
      this.deferredPrompt = e;
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }

  /*
  Makes sure user can't go to LoginPage and login with browser forward button
  */
  ionViewWillEnter(): void {
    this.authGuardService.logout();
  }

  /*
  Clears user input in Login-Page when user logs in
  */
  ionViewWillLeave(): void {
    this.usrName = '';
    this.pwd = '';    
  }

  ngOnInit() {
    this.addPrefersColorSchemeListener();

    // Init accentColors (not persistent yet!)
    document.body.style.setProperty('--accentColor', '#3880ff');
    document.body.style.setProperty('--toggleHead', '#ffffff');
  }

 

  /*
  Öffnet das PWA Installationsfenster des Browsers
  */
  install() {
    this.deferredPrompt.prompt();
  }

  /*
  Prüft Login-Daten mit AuthGuardService => wenn erfolgreich weiterleitung auf app
  */
  login() {
    console.log('User: ' + this.usrName + ' Password ' + this.pwd);
    this.authGuardService.authenticate(this.usrName, this.pwd);
    this.router.navigate(['/app']);
  }

  /*
  Reagiert auf Themeaenderung im System
  */
  addPrefersColorSchemeListener() {
    const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    const setColorScheme = e => {
      if (e.matches) {
        // Dark
        console.log('Detected Dark');
        this.enableDarkMode(true);
      } else {
        // Light
        console.log('Detected Light');
        this.enableDarkMode(false);
      }
    };

    setColorScheme(colorSchemeQueryList);
    colorSchemeQueryList.addListener(setColorScheme);
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
