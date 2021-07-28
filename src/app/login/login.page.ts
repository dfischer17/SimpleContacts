import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usrName: string;
  pwd: string;
  private authService: AuthService;

  constructor(private pAuthService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService = this.pAuthService;
    this.addPrefersColorSchemeListener();
  }

  /*
  Prüft Login-Daten mit authService => wenn erfolgreich weiterleitung auf app
  */
  login() {
    console.log('User: ' + this.usrName + ' Password ' + this.pwd);

    if (this.authService.checkPassword(this.usrName, this.pwd)) {
      console.log('Logged in!');
    }
    this.router.navigate(['/app']); // gehört in if für authenication
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
