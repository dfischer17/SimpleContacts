import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SplitLayoutPageRoutingModule } from './split-layout-routing.module';
import { SplitLayoutPage } from './split-layout.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitLayoutPageRoutingModule,
    SharedModule
  ],
  declarations: [SplitLayoutPage]
})
export class SplitLayoutPageModule {}
