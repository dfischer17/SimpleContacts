import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from 'src/app/services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.page.html',
  styleUrls: ['./secret.page.scss'],
})
export class SecretPage implements OnInit {

  constructor(private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.usrPreferences.initAccentColor();
  }
}
