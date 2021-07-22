import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { Person } from '../interfaces/person';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  contact: Person;

  constructor(public viewCtrl: ModalController, navParams: NavParams) { 
    this.contact = navParams.get('contact');
  }

  ngOnInit() {    
  }

  closeModal() {
    this.viewCtrl.dismiss();
    console.log('Modal closed');
  }
}
