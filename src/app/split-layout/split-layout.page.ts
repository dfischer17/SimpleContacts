import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/guards/auth-guard.service';

@Component({
  selector: 'app-split-layout',
  templateUrl: './split-layout.page.html',
  styleUrls: ['./split-layout.page.scss'],
})
export class SplitLayoutPage implements OnInit {

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() {
  }

  logout() {
    this.authGuardService.logout();
  }

}
