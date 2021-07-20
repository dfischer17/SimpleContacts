import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private correctUser: string = "Finn"
  private correctPassword: string = "asdf";

  checkPassword(user: string, password: string) {
    if (user === this.correctUser && password === this.correctPassword) {
      return true;
    }
    else {
      return false;
    }    
  }
}
