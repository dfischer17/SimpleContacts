import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.page.html',
  styleUrls: ['./change-password-modal.page.scss'],
})
export class ChangePasswordModalPage implements OnInit {

  newPassword: string;

  constructor(private userService: UserService, private authService: AuthenticationService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onSubmitPassword() {
    this.userService.changePassword(this.authService.getCurrentUser().id, {password: this.newPassword}).subscribe();
    this.modalCtrl.dismiss(this.newPassword);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
