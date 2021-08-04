import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/services/http-handler.service';
import { Contact } from 'src/app/interfaces/contact';
import { ModalController } from '@ionic/angular';
import { PersonDetailPage } from '../person-detail/person-detail.page';
import { CompanyDetailPage } from '../company-detail/company-detail.page';
import { ContactOption } from 'src/app/interfaces/contact-option';
import { LoadingController } from '@ionic/angular';
import { UserPreferencesService } from 'src/app/services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[];
  searchTerm: string;

  constructor(private httpHandler: HttpHandlerService, private modalController: ModalController, public loadingCtrl: LoadingController, private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.loadContacts();
    this.usrPreferences.initAccentColor();
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

  /*
  Loads contacts and hides loading-indicator when finished
  */
  handleLoadContacts() {
    this.httpHandler.loadSampleData().toPromise().then(data => {
      this.contacts = this.convertRequestData(data).sort((a, b) => this.sortContacts(a, b));
      this.closeLoading();
    });
  }

  /*
  Dismisses loading-indicator
  */
  closeLoading() {
    this.loadingCtrl.dismiss();
  }

  // Open contact-detail modal
  async openModal(contact: Contact) {
    let modal;

    // Person
    if (contact.contactType) {
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

  // Handle swiping
  swipeEvent($event, item, contact: Contact) {
    console.log($event)
    if ($event.detail.side == 'start') {
      console.log('call ' + this.getFirstPhonenumber(contact.contactOptions));
      window.open('tel:' + this.getFirstPhonenumber(contact.contactOptions), "_self");
      this.closeAllItems(item)
    } else {
      console.log('email ' + this.getFirstEmailAddress(contact.contactOptions));
      window.open('mailto:' + this.getFirstEmailAddress(contact.contactOptions), "_self");
      this.closeAllItems(item)
    }
  }

  // Close swipes after swiping
  closeAllItems(item) {
    let a = Array.prototype.slice.call(item.el.children)
    a.map((val) => {
      val.close();
    })
  }

  /*HELPERS*/

  /*
  Konvertiert die Testdaten in ein für die Anwendung passendes Format
  */
  convertRequestData(requestData): Contact[] {
    const tempContacts: Contact[] = [];

    requestData.forEach(contact => {
      tempContacts.push({
        // Properties für Person und Unternehmen
        contactType: contact.hasOwnProperty('Natuerlich'),
        address: [
          {
            streetName: contact.Adresse[0].Strassenname,
            orientationNumber: contact.Adresse[0].Orientierungsnummer,
            postalCode: contact.Adresse[0].Postleitzahl,
            city: contact.Adresse[0].Ortschaft,
          }
        ],

        contactOptions: contact.Kontakte,

        // Properties für Person
        lastname: contact.Natuerlich?.[0].Familienname,
        firstname: contact.Natuerlich?.[0].Vorname,
        birthdate: contact.Natuerlich?.[0].Geburtsdatum,
        gender: contact.Natuerlich?.[0].Geschlecht,

        // Properties für Unternehmen
        companyname: contact.Unternehmen?.[0].Name,
        contactPersons: contact.Ansprechpartner,
      });
    });

    return tempContacts;
  }

  /*
  Sorts the contacts either by lastname or companyname depending on type
  */
  private sortContacts(a: Contact, b: Contact) {
    // Compare two persons
    if (a.companyname === undefined && b.companyname === undefined) {
      return ('' + a.lastname).localeCompare(b.lastname);
    }

    // Compare two companies
    else if (a.lastname === undefined && b.lastname === undefined) {
      return ('' + a.companyname).localeCompare(b.companyname);
    }

    // Compare person with company
    else if (a.companyname === undefined && b.lastname === undefined) {
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
  getFirstPhonenumber(contactOptions: ContactOption[]) {
    let phoneNumber: string;

    contactOptions.forEach(function (contactOption) {
      const option: number = contactOption.Kontaktart;

      // Wenn Kontaktoption Tel-nummer zurückgeben
      if (option === 1 || option === 2 || option === 3) {
        phoneNumber = contactOption.Kontaktdaten;
      }
    });

    return phoneNumber;
  }

  /*
  Get's the first emailable contactOption of a contact
  */
  getFirstEmailAddress(contactOptions: ContactOption[]): string {
    let email: string;

    contactOptions.forEach(function (contactOption) {
      const option: number = contactOption.Kontaktart;

      // Wenn Kontaktoption email zurückgeben
      if (option === 4) {
        email = contactOption.Kontaktdaten;
      }
    });

    return email;
  }
}
