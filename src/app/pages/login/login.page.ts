import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  returnUrl: string;
  username: string;
  password: string;
  private deferredPrompt; // doesn't work properly!

  // eslint-disable-next-line max-len
  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController, private auth: AuthService, private usrPreferences: UserPreferencesService, private jwtAuthService: AuthenticationService) {
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
    this.jwtAuthService.logout(); // reset login
    this.returnUrl = this.route.snapshot?.queryParams?.returnUrl || '/app';
    this.usrPreferences.addPrefersColorSchemeListener();
    this.usrPreferences.initAccentColor();
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
    // this.auth.login(this.usrName, this.pwd).subscribe(_ => {
    //   this.router.navigateByUrl('app', { replaceUrl: true });
    // });

    // if (this.auth.getUserSync() === undefined) {
    //   this.showWrongLoginAlert();
    // }

    console.log(`LoginPage::login`);
    this.jwtAuthService.login(this.username, this.password)
      .subscribe(
        x => {
          console.log(x);
          this.router.navigate([this.returnUrl]);
        },
        error => this.showWrongLoginAlert(),
      );
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
}
