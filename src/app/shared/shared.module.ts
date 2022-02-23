import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CompanyContactComponent } from './components/company-contact/company-contact.component';
import { PersonContactComponent } from './components/person-contact/person-contact.component';

@NgModule({
  declarations: [CompanyContactComponent, PersonContactComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CompanyContactComponent,
    PersonContactComponent
  ]
})
export class SharedModule { }
