import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService, DataService, AuthGuard, IntroGuard]
})
export class CoreModule { }
