import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
  contact: Contact;

  constructor(public viewCtrl: ModalController, navParams: NavParams) {
    this.contact = navParams.get('contact');
  }

  ngOnInit() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
    console.log('Contact-details closed');
  }
}
