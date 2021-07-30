import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/services/http-handler.service';
import { PersonContactComponent } from 'src/app/components/person-contact/person-contact.component';
import { CompanyContactComponent } from 'src/app/components/company-contact/company-contact.component';
import { Contact } from 'src/app/interfaces/contact';

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
      // this.contacts = data;
      this.contacts = this.convertRequestData(data);
      this.contacts.forEach(x => console.log(x));
    });

    
  }

  /*
  Konvertiert die Testdaten in ein für die Anwendung passendes Format
  */
  convertRequestData(requestData) {
    let tempContacts: Contact[] = [];
    
    requestData.forEach(contact => {      
      tempContacts.push({
        contactType: contact.PersArt,
        lastname: contact.Natuerlich?.Familienname,
        firstname: contact.Natuerlich?.Vorname,
        companyname: contact.Unternehmen?.Name,
      })
    });

    return tempContacts;
  }
}
