import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContactsPageRoutingModule } from './contacts-routing.module';
import { ContactsPage } from './contacts.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyDetailPageModule } from '../company-detail/company-detail.module';
import { PersonDetailPageModule } from '../person-detail/person-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ContactsPageRoutingModule,
    Ng2SearchPipeModule,
    CompanyDetailPageModule,
    PersonDetailPageModule
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
