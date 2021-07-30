import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-person-contact',
  templateUrl: './person-contact.component.html',
  styleUrls: ['./person-contact.component.scss'],
})
export class PersonContactComponent implements OnInit {
  @Input() person: Contact;

  constructor() {}

  ngOnInit() {}

}
