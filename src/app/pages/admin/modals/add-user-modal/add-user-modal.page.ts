import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.page.html',
  styleUrls: ['./add-user-modal.page.scss'],
})
export class AddUserModalPage implements OnInit {

  addUserForm = new FormGroup({
    name: new FormControl(''),
    role: new FormControl(),
    password: new FormControl(''),
  });

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onSubmitUser() {
    this.modalCtrl.dismiss(this.addUserForm.value);
  }
}
