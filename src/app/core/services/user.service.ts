import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUser } from 'src/app/models/update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:5001/api/User';

  constructor(private httpClient: HttpClient) { }

  changePassword(id: number, updateUser: UpdateUser) {
    return this.httpClient.put<UpdateUser>(`${this.baseUrl}/${id}`, updateUser);
  }
}
