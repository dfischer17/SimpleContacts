import { Component, OnInit } from '@angular/core';
import { Person } from '../interfaces/person';
import { HttpHandlerService } from '../services/http-handler.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  persons: Person[];
  searchTerm :string;

  constructor(private httpHandler: HttpHandlerService) { }

  ngOnInit() {
    // Load Contacts
    this.httpHandler.loadDummyData().toPromise().then(contacts => {
      this.persons = contacts.sort((a, b) => (a.lastname < b.lastname ? -1 : 1));;
    });
  }
}
