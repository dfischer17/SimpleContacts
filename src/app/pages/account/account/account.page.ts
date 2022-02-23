import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth.service';
import { UserPreferencesService } from '../../../core/services/user-preferences.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService, private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.usrPreferences.initAccentColor();
    this.loadLoggedInUser();
  }

  async loadLoggedInUser() {
    this.currentUser = this.authService.getUserSync();
  }
}
