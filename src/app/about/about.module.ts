import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import { PersonEntryComponent } from '../components/person-entry/person-entry.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContactDetailPageModule } from '../contact-detail/contact-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    Ng2SearchPipeModule,
    ContactDetailPageModule
  ],
  declarations: [AboutPage, PersonEntryComponent]
})
export class AboutPageModule {}
