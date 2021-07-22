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
  persons: Observable<Person[]>;

  constructor(private httpHandler: HttpHandlerService) { }

  ngOnInit() {
    this.persons = this.httpHandler.loadDummyData();
  }
}
