import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserModalPageRoutingModule } from './add-user-modal-routing.module';

import { AddUserModalPage } from './add-user-modal.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUserModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddUserModalPage]
})
export class AddUserModalPageModule {}
