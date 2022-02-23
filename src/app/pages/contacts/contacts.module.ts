import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContactsPageRoutingModule } from './contacts-routing.module';
import { ContactsPage } from './contacts.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PersonDetailPage } from '../person-detail/person-detail.page';
import { CompanyDetailPage } from '../company-detail/company-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ContactsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ContactsPage, PersonDetailPage, CompanyDetailPage]
})
export class ContactsPageModule {}
