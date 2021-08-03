import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usrName: string;
  pwd: string;
  private deferredPrompt;

  constructor(private router: Router, public alertController: AlertController, private auth: AuthService) {
    // Initialize deferredPrompt for use later to show browser install prompt.
    window.addEventListener('beforeinstallprompt', (e) => {
      // Standard installieren Message abfangen
      e.preventDefault();

      // Installieren event speichern
      this.deferredPrompt = e;
      console.log(`'beforeinstallprompt' event was fired.`);
    });
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
  Prüft Login-Daten mit AuthService => wenn erfolgreich weiterleitung auf app
  */
  login() {
    this.auth.login(this.usrName, this.pwd).subscribe(_ => {
      this.router.navigateByUrl('app', {replaceUrl: true});
    });

    if (this.auth.getUserSync() === undefined) {
      this.showWrongLoginAlert();
    }
  }

  /*
  Shows alert when user enters wrong credentials
  */
  async showWrongLoginAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Login fehlgeschlagen!',
      subHeader: 'Benutzername oder Passwort ungültig.',
      message: 'Achten Sie auf korrekte Groß- und Kleinschreibung.',
      buttons: ['OK']
    });

    await alert.present();
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
