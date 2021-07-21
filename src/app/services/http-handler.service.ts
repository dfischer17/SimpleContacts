import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(private httpClient: HttpClient) { }
    
  loadDummyData() { 
    this.httpClient.get("./assets/data/students.json").subscribe(data =>{
      console.log('Clinet ' + typeof this.httpClient.get("./assets/data/students.json"))
      console.log('Loaded data from assets.students.json');
      console.log(data);
      console.log(typeof data)
      return data;      
    })
  }
}
