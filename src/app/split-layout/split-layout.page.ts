import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-split-layout',
  templateUrl: './split-layout.page.html',
  styleUrls: ['./split-layout.page.scss'],
})
export class SplitLayoutPage implements OnInit {

  constructor(private authService: AuthService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    //this.authService.logout();
    this.authenticationService.logout();
  }
}
