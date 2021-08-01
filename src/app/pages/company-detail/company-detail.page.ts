import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.page.html',
  styleUrls: ['./company-detail.page.scss'],
})
export class CompanyDetailPage implements OnInit {
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
