import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  // students: any = [];
  persons: Person[];


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.httpClient.get("./assets/data/students.json").subscribe(data =>{
    //   console.log(data);
    //   this.students = data;
    // })

    this.persons = [
      {
        lastname: "Fischer",
        firstname: "Daniel",
        postalCode: "4312",
        city: "Wels",
        address: "Freiburg 87"
      },
      {
        lastname: "Huber",
        firstname: "Franz",
        postalCode: "6457",
        city: "Rottenbach",
        address: "Stötten 14"
      },
      {
        lastname: "Gruber",
        firstname: "David",
        postalCode: "3478",
        city: "Gallspach",
        address: "Brandhof 16"
      },
      {
        lastname: "Sterner",
        firstname: "Leon",
        postalCode: "2345",
        city: "Kematen",
        address: "Ziegeleistraße 14"
      },
      {
        lastname: "Niemens",
        firstname: "Phillip",
        postalCode: "7456",
        city: "Meggenhofen",
        address: "Goethestraße 34"
      },
    ]          
  }
}
