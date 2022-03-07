import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { IntroGuard } from './guards/intro.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DataService, IntroGuard, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})
export class CoreModule { }
