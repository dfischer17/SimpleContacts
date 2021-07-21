import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-person-entry',
  templateUrl: './person-entry.component.html',
  styleUrls: ['./person-entry.component.scss'],
})
export class PersonEntryComponent implements OnInit {
  @Input() person: Person;

  constructor() { }

  ngOnInit() {}

}
