import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/services/http-handler.service';
import { CompanyContactComponent } from 'src/app/components/company-contact/company-contact.component';
import { Contact } from 'src/app/interfaces/contact';
import { Address } from 'src/app/interfaces/address';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[];
  searchTerm: string;

  constructor(private httpHandler: HttpHandlerService) { }

  ngOnInit() {
    // Load Contacts
    this.httpHandler.loadSampleData().toPromise().then(data => {
      this.contacts = this.convertRequestData(data).sort((a, b) => this.sortContacts(a, b));
    });
  }

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

        // Properties für Person
        lastname: contact.Natuerlich?.[0].Familienname,
        firstname: contact.Natuerlich?.[0].Vorname,

        // Properties für Unternehmen
        companyname: contact.Unternehmen?.[0].Name,
      });
    });



    return tempContacts;
  }

  /*
  Sorts the contacts either by lastname or companyname depending on type
  */
  private sortContacts(a: Contact, b: Contact) {
    if (a.hasOwnProperty('lastname')) {
      return ('' + a.lastname).localeCompare(b.lastname);
    }
    else {
      return ('' + a.companyname).localeCompare(b.companyname);
    }
  }
}
