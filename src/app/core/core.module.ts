import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService, DataService, AuthGuard, IntroGuard, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})
export class CoreModule { }
