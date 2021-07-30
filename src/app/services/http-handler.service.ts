import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(private httpClient: HttpClient) { }

  loadDummyData(): Observable<Person[]> {
    return this.httpClient.get<Person[]>('./assets/data/personsData.json');
  }

  loadSampleData() {
    return this.httpClient.get('./assets/data/sample-data.json');
  }
}

