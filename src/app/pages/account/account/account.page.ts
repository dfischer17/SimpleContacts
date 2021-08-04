import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth/auth.service';
import { UserPreferencesService } from 'src/app/services/user-preferences/user-preferences.service';

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
