import { Component, OnInit } from '@angular/core';
import { Person } from '../interfaces/person';
import { HttpHandlerService } from '../services/http-handler.service';
import { ModalController } from '@ionic/angular';
import { ContactDetailPage } from '../contact-detail/contact-detail.page';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  persons: Person[];
  searchTerm :string;

  constructor(private httpHandler: HttpHandlerService, public modalController: ModalController) { }

  ngOnInit() {
    // Load Contacts
    this.httpHandler.loadDummyData().toPromise().then(contacts => {
      this.persons = contacts.sort((a, b) => (a.lastname < b.lastname ? -1 : 1));;
    });

    //this.openModal();
    //this.modalController.dismiss();
  }

  async openModal(contact: Person) {
    const modal = await this.modalController.create({
    component: ContactDetailPage,
    componentProps: {contact: contact}
    });
    return await modal.present();
   }
}
