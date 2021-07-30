import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-contact',
  templateUrl: './person-contact.component.html',
  styleUrls: ['./person-contact.component.scss'],
})
export class PersonContactComponent implements OnInit {
  @Input() lastname: string;

  constructor() {}

  ngOnInit() {}

}
