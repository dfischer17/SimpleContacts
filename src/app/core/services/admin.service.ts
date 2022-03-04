import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://localhost:5001/api/User';

  constructor(private httpClient: HttpClient) { }

  loadUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

  addUser(addUser: any) {
    return this.httpClient.post<any>(this.baseUrl, addUser);
  }

  removeUser(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
