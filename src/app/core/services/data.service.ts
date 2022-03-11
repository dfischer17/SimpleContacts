import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  /*
  Loads contacts from asset folder for testing
  */
  // loadSampleData() {
  //   return this.httpClient.get('./assets/data/persons.json');
  // }

  /*
  Loads contacts from backend
  */
  loadContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>('https://localhost:5001/api/Contact');
  }
}
