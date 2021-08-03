import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/guards/auth-guard.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-split-layout',
  templateUrl: './split-layout.page.html',
  styleUrls: ['./split-layout.page.scss'],
})
export class SplitLayoutPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {   
    this.authService.logout();
  }

}
