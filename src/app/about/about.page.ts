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
  searchTerm: string;

  constructor(private httpHandler: HttpHandlerService, public modalController: ModalController) { }

  ngOnInit() {
    // Load Contacts
    this.httpHandler.loadDummyData().toPromise().then(contacts => {
      this.persons = contacts.sort((a, b) => (a.lastname < b.lastname ? -1 : 1));;
    });
  }

  // Open person-detail modal
  async openModal(contact: Person) {
    const modal = await this.modalController.create({
      component: ContactDetailPage,
      componentProps: { contact: contact }
    });
    return await modal.present();
  }

  // Handle person item swiping
  swipeEvent($event, item, person: Person) {
    console.log($event)
    if ($event.detail.side == 'start') {
      console.log('call ' + person.phone);
      window.open('tel:' + person.phone, "_self");
      this.closeAllItems(item)      
    } else {
      console.log('email ' + person.mail);
      window.open('mailto:' + person.mail, "_self");
      this.closeAllItems(item)
    }
  }

  // Helper for swiper rendering
  closeAllItems(item) {
    let a = Array.prototype.slice.call(item.el.children)
    a.map((val) => {
      val.close();
    })
  }
}
