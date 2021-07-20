import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usrName: string;
  pwd: string;
  private authService: AuthService;

  constructor(private pAuthService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService = this.pAuthService;
  }

  login() {
    console.log("User: " + this.usrName + " Password " + this.pwd)

    if (this.authService.checkPassword(this.usrName, this.pwd)) {
      console.log("Logged in!")
      this.router.navigate(['/persons'])
    }
  }
}
