import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Contact } from 'src/app/models/contact';
import { ModalController } from '@ionic/angular';
import { PersonDetailPage } from '../person-detail/person-detail.page';
import { CompanyDetailPage } from '../company-detail/company-detail.page';
import { ContactOption } from 'src/app/models/contact-option';
import { LoadingController } from '@ionic/angular';
import { UserPreferencesService } from '../../core/services/user-preferences.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[];
  searchTerm: string;

  // eslint-disable-next-line max-len
  constructor(private dataService: DataService, private modalController: ModalController, public loadingCtrl: LoadingController, private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.loadContacts();
    this.usrPreferences.initPreferences();
    console.log('Loaded contacts');
  }

  /*
  Displays spinning loading-indicator while contacts are loaded
  */
  loadContacts() {
    this.loadingCtrl.create({
      message: 'Lade Kontakte...',
      translucent: true
    }).then((res) => {
      res.present();
      this.handleLoadContacts();
    });
  }

  // Open contact-detail modal
  async openModal(contact: Contact) {
    let modal;

    // Person
    if (!contact.contactType) {
      modal = await this.modalController.create({
        component: PersonDetailPage,
        componentProps: { contact }
      });
    }

    // Unternehmen
    else {
      modal = await this.modalController.create({
        component: CompanyDetailPage,
        componentProps: { contact }
      });
    }

    return await modal.present();
  }

  handleSlideCall(contact: Contact) {
    window.open('tel:' + this.getFirstPhonenumber(contact.contactOptions), '_self');
  }

  handleSlideEmail(contact: Contact) {
    window.open('mailto:' + this.getFirstEmailAddress(contact.contactOptions), '_self');
    console.log('Handle slide email');
  }

  /*
 Loads contacts and hides loading-indicator when finished
 */
  private handleLoadContacts() {
    this.dataService.loadContacts().toPromise().then(data => {
      this.contacts = data.sort((a, b) => this.sortContacts(a, b));
      this.closeLoading();
      console.log(data);
    });
  }

  /*
  Dismisses loading-indicator
  */
  private closeLoading() {
    this.loadingCtrl.dismiss();
  }

  /*HELPERS*/
  /*
  Sorts the contacts either by lastname or companyname depending on type
  */
  private sortContacts(a: Contact, b: Contact) {
    // Compare two persons
    if (a.companyname === null && b.companyname === null) {
      return ('' + a.lastname).localeCompare(b.lastname);
    }

    // Compare two companies
    else if (a.lastname === null && b.lastname === null) {
      return ('' + a.companyname).localeCompare(b.companyname);
    }

    // Compare person with company
    else if (a.companyname === null && b.lastname === null) {
      return ('' + a.lastname).localeCompare(b.companyname);
    }

    // Compare company with person
    else {
      return ('' + a.companyname).localeCompare(b.lastname);
    }
  }

  /*
  Get's the first callable contactOption of a contact
  */
  private getFirstPhonenumber(contactOptions: ContactOption[]) {
    let phoneNumber: string;

    contactOptions.forEach(function (contactOption) {
      const option: number = contactOption.type;

      // Wenn Kontaktoption Tel-nummer zurückgeben
      if (option === 1 || option === 2 || option === 3) {
        phoneNumber = contactOption.data;
      }
    });

    return phoneNumber;
  }

  /*
  Get's the first emailable contactOption of a contact
  */
  private getFirstEmailAddress(contactOptions: ContactOption[]): string {
    let email: string;

    contactOptions.forEach(function (contactOption) {
      const option: number = contactOption.type;

      // Wenn Kontaktoption email zurückgeben
      if (option === 4) {
        email = contactOption.data;
      }
    });

    return email;
  }
}
