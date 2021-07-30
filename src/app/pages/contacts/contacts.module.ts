import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { PersonContactComponent } from 'src/app/components/person-contact/person-contact.component';
import { CompanyContactComponent } from 'src/app/components/company-contact/company-contact.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ContactsPage, PersonContactComponent, CompanyContactComponent]
})
export class ContactsPageModule {}
