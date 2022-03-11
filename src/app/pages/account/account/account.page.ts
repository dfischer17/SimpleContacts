import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserPreferencesService } from '../../../core/services/user-preferences.service';
import { ChangePasswordModalPage } from '../modals/change-password-modal/change-password-modal.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser: any;

  constructor(private authService: AuthenticationService, private usrPreferences: UserPreferencesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.usrPreferences.initPreferences();
    this.loadCurrentUser();
  }

  // Open change-password-modal
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalPage,
      componentProps: { userId: this.authService.getCurrentUser().id }
    });

    return await modal.present();
  }

  private loadCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
