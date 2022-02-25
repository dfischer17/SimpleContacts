import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth.service';
import { UserPreferencesService } from '../../../core/services/user-preferences.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.usrPreferences.initAccentColor();
    //this.loadLoggedInUser();
    this.loadCurrentUser();
  }

  // async loadLoggedInUser() {
  //   this.currentUser = this.authService.getUserSync();
  // }

  loadCurrentUser() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }
}
