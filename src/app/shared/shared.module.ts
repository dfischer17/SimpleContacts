import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CompanyContactComponent } from './components/company-contact/company-contact.component';
import { PersonContactComponent } from './components/person-contact/person-contact.component';
import { HasPermissionDirective } from './directives/has-permission.directive';

@NgModule({
  declarations: [CompanyContactComponent, PersonContactComponent, HasPermissionDirective],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CompanyContactComponent,
    PersonContactComponent,
    HasPermissionDirective
  ]
})
export class SharedModule { }
