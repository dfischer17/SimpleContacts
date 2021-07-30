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

  constructor(private httpHandler: HttpHandlerService) { }

  ngOnInit() {
    // Load Contacts
    this.httpHandler.loadSampleData().toPromise().then(data => {
      this.contacts = this.convertRequestData(data);
      this.contacts.forEach(x => console.log(x));
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
}
