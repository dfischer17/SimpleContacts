import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  /*
  Lädt die Beispieldaten aus dem assets-Folder und gibt sie als
  Observable zurück
  */
  loadSampleData() {
    return this.httpClient.get('./assets/data/persons.json');
  }
}
