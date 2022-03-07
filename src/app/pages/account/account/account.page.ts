import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserPreferencesService } from '../../../core/services/user-preferences.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser: any;

  constructor(private authService: AuthenticationService, private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.usrPreferences.initPreferences();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
